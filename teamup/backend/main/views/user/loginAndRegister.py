from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from main.models import User
from backend import settings
from main.contants import RegisterResponseCode, CommonErrorcode, LoginResponseCode
from main.tools import checkIsNotEmpty, getCurrentTimestamp, encrypteToken, GenertorCode, validateEmailFormat, decodeToken
from django.core.cache import cache
import json


from main.task import send_async_email


class register(APIView):
    def post(self, request, *args, **kwargs):

        try:
            UserData = json.loads(request.body).get('data', None)

            if UserData is None:
                return JsonResponse(CommonErrorcode.paramsError)

            if not checkIsNotEmpty(UserData):
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
            RegisterResponseCode.success['access_token'] = encrypteToken(
                self, RegisterUser)
            RegisterResponseCode.success['create_time'] = RegisterUser.create_time
            cache.delete('code_' + UserData['email'])
            return JsonResponse(RegisterResponseCode.success)

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
            cache.set('code_' + email, EmailCode, 300)

            return JsonResponse(RegisterResponseCode.emailCodeSuccess)

        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)


class login(APIView):

    def get(self, request, *args, **kwargs):
        try:
            token = request.GET.get('access_token', None)

            if token is None or token == '':
                return JsonResponse(CommonErrorcode.paramsError)
            payload = decodeToken(token)
            if payload['expire_time'] <= getCurrentTimestamp():
                return JsonResponse(LoginResponseCode.tokenExpires)

            LoginResponseCode.tokenToInfoSuccess['username'] = payload['username']
            LoginResponseCode.tokenToInfoSuccess['admin'] = payload['admin']
            LoginResponseCode.tokenToInfoSuccess['premium'] = payload['premium']
            LoginResponseCode.tokenToInfoSuccess['email'] = payload['email']
            LoginResponseCode.tokenToInfoSuccess['create_time'] = payload['create_time']
            LoginResponseCode.tokenToInfoSuccess['avator_color'] = payload['avator_color']

            class UserInfo:
                username = payload['username']
                admin = payload['admin']
                premium = payload['premium']
                email = payload['email']
                avator_color = payload['avator_color']
            LoginResponseCode.tokenToInfoSuccess['access_token'] = encrypteToken(
                self, UserInfo)
            return JsonResponse(LoginResponseCode.tokenToInfoSuccess)

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

            LoginResponseCode.loginSuccess['username'] = UserFields.username
            LoginResponseCode.loginSuccess['admin'] = UserFields.admin
            LoginResponseCode.loginSuccess['premium'] = UserFields.premium
            LoginResponseCode.loginSuccess['email'] = UserFields.email
            LoginResponseCode.loginSuccess['create_time'] = UserFields.create_time
            LoginResponseCode.loginSuccess['avator_color'] = UserFields.avator_color

            class UserInfo:
                username = UserFields.username
                admin = UserFields.admin
                premium = UserFields.premium
                email = UserFields.email
                avator_color = UserFields.avator_color
            LoginResponseCode.loginSuccess['access_token'] = encrypteToken(
                self, UserInfo)

            return JsonResponse(LoginResponseCode.loginSuccess)

        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)
