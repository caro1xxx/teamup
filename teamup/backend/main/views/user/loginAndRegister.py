from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from main.models import User
from backend import settings
from main.contants import RegisterResponseCode, CommonErrorcode, LoginResponseCode
from main.tools import checkIsNotEmpty, getCurrentTimestamp, encrypteToken, GenertorCode, validateEmailFormat, decodeToken
from django.core.cache import cache
import json
from main.config import REGISTER_CODE_LIFECYCLE
from main.task import send_async_email


class register(APIView):
    def post(self, request, *args, **kwargs):

        try:
            UserData = json.loads(request.body).get('data', None)

            if UserData is None:
                return JsonResponse(CommonErrorcode.paramsError)

            if not checkIsNotEmpty(UserData):
                return JsonResponse(CommonErrorcode.paramsError)

            if len(UserData['username']) < 5 or len(UserData['password']) < 8:
                return JsonResponse(CommonErrorcode.paramsError)

            UserFields = User.objects.filter(username=UserData['username'])
            if UserFields.exists():
                return JsonResponse(RegisterResponseCode.userExists)
            EmailFields = User.objects.filter(email=UserData['email'])
            if EmailFields.exists():
                return JsonResponse(RegisterResponseCode.emailExists)
            MenmoryCode = cache.get('code_' + UserData['email'])
            if MenmoryCode is None or MenmoryCode != UserData['code']:
                return JsonResponse(RegisterResponseCode.codeError)

            RegisterUser = User.objects.create(username=UserData['username'], password=UserData['password'],
                                               email=UserData['email'], create_time=getCurrentTimestamp(), avator_color=UserData['avator_color'])

            ret = {'code': 200, 'message': '注册成功'}
            ret['access_token'] = encrypteToken(
                self, RegisterUser)
            ret['create_time'] = RegisterUser.create_time
            cache.delete('code_' + UserData['email'])
            return JsonResponse(ret)

        except Exception as e:
            UserFields = User.objects.filter(username=UserData['username'])
            if UserFields.exists():
                UserFields.delete()
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)


class sendEmailCode(APIView):
    def get(self, request, *args, **kwargs):
        try:
            email = request.GET.get('email', None)

            if email is None or email == '':
                return JsonResponse(CommonErrorcode.emailError)
            if validateEmailFormat(email) is False:
                return JsonResponse(CommonErrorcode.emailError)

            EmailCode = GenertorCode()
            send_async_email.delay(
                'Teamup注册验证码', EmailCode, settings.EMAIL_HOST_USER, email)
            cache.set('code_' + email, EmailCode, REGISTER_CODE_LIFECYCLE)

            return JsonResponse(RegisterResponseCode.emailCodeSuccess)

        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)


class login(APIView):

    def get(self, request, *args, **kwargs):
        try:
            authorization_header = request.META.get(
                'HTTP_AUTHORIZATION', None)
            if authorization_header is None or authorization_header == '' or authorization_header == 'Bearer':
                return JsonResponse(CommonErrorcode.paramsError)

            payload = decodeToken(authorization_header.replace('Bearer ', ''))
            if payload['expire_time'] <= getCurrentTimestamp():
                return JsonResponse(LoginResponseCode.tokenExpires)

            ret = {'code': 200, 'message': '获取成功'}
            ret['username'] = payload['username']
            ret['admin'] = payload['admin']
            ret['premium'] = payload['premium']
            ret['email'] = payload['email']
            ret['create_time'] = payload['create_time']
            ret['avator_color'] = payload['avator_color']

            class UserInfo:
                username = payload['username']
                admin = payload['admin']
                premium = payload['premium']
                email = payload['email']
                avator_color = payload['avator_color']
            ret['access_token'] = encrypteToken(
                self, UserInfo)
            return JsonResponse(ret)

        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.illegallyError)

    def post(self, request, *args, **kwargs):
        try:
            UserData = json.loads(request.body).get('data', None)
            if UserData['username'] == '' or UserData['username'] is None:
                return JsonResponse(CommonErrorcode.paramsError)
            UserFields = User.objects.filter(
                username=UserData['username']).first()

            if UserFields is None or UserFields.password != UserData['password']:
                return JsonResponse(LoginResponseCode.usernameOrPasswordError)

            ret = {'code': 200, 'message': '登录成功'}
            ret['username'] = UserFields.username
            ret['admin'] = UserFields.admin
            ret['premium'] = UserFields.premium
            ret['email'] = UserFields.email
            ret['create_time'] = UserFields.create_time
            ret['avator_color'] = UserFields.avator_color

            class UserInfo:
                username = UserFields.username
                admin = UserFields.admin
                premium = UserFields.premium
                email = UserFields.email
                avator_color = UserFields.avator_color
            ret['access_token'] = encrypteToken(
                self, UserInfo)

            return JsonResponse(ret)

        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)
