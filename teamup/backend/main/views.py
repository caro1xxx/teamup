from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from main.models import User
from backend import settings
from main.contants import RegisterResponseCode, CommonErrorcode
from main.tools import checkIsNotEmpty, getCurrentTimestamp, encrypteToken, GenertorCode, validateEmailFormat
from django.core.cache import cache
import json

from .task import send_async_email



class register(APIView):
    def post(self, request, *args, **kwargs):
       
        try:
            UserData = json.loads(request.body).get('data', None)

            if UserData is None:
                return JsonResponse(CommonErrorcode.paramsError)
            
            if not checkIsNotEmpty(UserData):
                return JsonResponse(CommonErrorcode.paramsError)
            
            UserFields = User.objects.filter(username = UserData['username'])
            if UserFields.exists():
                return JsonResponse(RegisterResponseCode.userExists)
            EmailFields = User.objects.filter(email = UserData['email'])
            if EmailFields.exists():
                return JsonResponse(RegisterResponseCode.emailExists)
            MenmoryCode = cache.get('code_' + UserData['email'])
            if MenmoryCode is None or MenmoryCode != UserData['code']:
                return JsonResponse(RegisterResponseCode.codeError)
            
            cache.delete('code_' + UserData['email'])
            RegisterUser = User.objects.create(username = UserData['username'], password = UserData['password'], email = UserData['email'] ,create_time = getCurrentTimestamp())
            RegisterResponseCode.success['access_token'] = encrypteToken(self,RegisterUser)

            return JsonResponse(RegisterResponseCode.success)
            
        except Exception as e:
            UserFields = User.objects.filter(username = UserData['username'])
            if UserFields.exists():
                UserFields.delete()
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)
        

class sendEmailCode(APIView):
    def get(self, request, *args, **kwargs):
        try:
            email = request.GET.get('email', None)

            if email is None:
                return JsonResponse(CommonErrorcode.paramsError)
            if validateEmailFormat(email) is False:
                return JsonResponse(CommonErrorcode.emailError)
            
            EmailCode = GenertorCode()
            send_async_email.delay('Teamup注册验证码', EmailCode, settings.EMAIL_HOST_USER, email)
            cache.set('code_'+ email, EmailCode, 300)

            return JsonResponse(RegisterResponseCode.emailCodeSuccess)
            
        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)