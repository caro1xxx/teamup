from rest_framework.views import APIView
from django.core import serializers
from django.http import JsonResponse

from main.models import User, Guest

from main.constant import UserMsg
from main.check import isEmpty, isEmail, isIpV4
from main.tools import randomNumber, userDeviceSystem

# from news_backend import settings

# from main.views import userop
# from main import tools
# from main.chat.chat import send_message

import json
# import jwt


class Login(APIView):
  def post(self, request, *args, **kwargs):
    try:
      data = json.loads(request.body).get('data', {})

      user = User.objects.filter(username = data.get('username','')).first()
      if user is None:
        return JsonResponse(UserMsg.userNotFound)
      if user.password != data.get('password',''):
        return JsonResponse(UserMsg.passwordOrUsernameError)
      if user.status == 0:
        return JsonResponse(UserMsg.userBan)
      
      return JsonResponse(UserMsg.success)
    except Exception as e:
      ret = {'code': 500, 'msg': 'Timeout'}
      return JsonResponse(ret)
    

class Register(APIView):
  def post(self, request, *args, **kwargs):
    try:
      data = json.loads(request.body).get('data', {})

      for i in ['username','password','email','code']:
        if isEmpty(data.get(i,'')) is False:
          return JsonResponse({'code':UserMsg.missParams['code'],'msg':UserMsg.missParams['msg']+i})
      if User.objects.filter(username = data.get('username')).first() is not None:
        return JsonResponse(UserMsg.usernameRepeat)
      if isEmail(data.get('email')) == False:
        return JsonResponse(UserMsg.errorEmail)
      if isIpV4(request.META.get('REMOTE_ADDR','')):
        return JsonResponse(UserMsg.errorIp)
      
      return JsonResponse(UserMsg.registerSucess)
    except Exception as e:
      ret = {'code': 500, 'msg': 'Timeout'}
      return JsonResponse(ret)
    

class ImpliedRegister(APIView):
  def get(self, request, *args, **kwargs):
    try:
      flag = request.GET.get('markerKey')
      browser = request.GET.get('browser','empty')
      user = Guest.objects.filter(marker_key = flag).first()
      print(request.META.get('HTTP_USER_AGENT'))
      if user is not None and request.META.get('REMOTE_ADDR','') == user.ip_address and browser == user.browser and user.system == userDeviceSystem(request.META.get('HTTP_USER_AGENT')):
        return JsonResponse({'username':user.username,'markerKey':user.marker_key,'code':200})
      
      Guest.objects.create(username = '游客'+str(randomNumber()) ,marker_key = flag, browser = browser, system= userDeviceSystem(request.META.get('HTTP_USER_AGENT')), ip_address= request.META.get('REMOTE_ADDR',''))
      return JsonResponse(UserMsg.registerSucess)
    except Exception as e:
      ret = {'code': 500, 'msg': 'Timeout'}
      return JsonResponse(ret)