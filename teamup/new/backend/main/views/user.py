from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from main.response import CommonResponse
import json
from django.core.cache import cache
from main.models import User
from main.config import loginRoomMemoryExsitTime
from main.tools import toMD5, sendMessageToChat, encrypteToken, randomString, getCurrentTimestamp, decodeToken


class LoginToken(APIView):
    def get(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': 'success'}
        try:
            token = request.GET.get('token', None)
            cache.set('login_token_'+token, 1, loginRoomMemoryExsitTime)
            ret['token'] = token
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse(CommonResponse.serverError)

    def post(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': 'success'}
        try:
            token = json.loads(request.body).get('token', None)
            sign = json.loads(request.body).get('sign', None)
            accessToken = json.loads(request.body).get('accessToken', None)

            if accessToken is None:
                if toMD5(token) != sign:
                    return JsonResponse({"code": 401, "message": "非法"})

                UserFields = User.objects.create(username=randomString(
                    8), level=0, email=randomString(7)+'@teamup.best', create_time=getCurrentTimestamp())
                # 生成AccessToken
                accessToken = encrypteToken(self, {"username": UserFields.username,
                                                   "level": UserFields.level, "email": UserFields.email})
            else:
                UserInfo = decodeToken(accessToken)
                UserFields = User.objects.filter(username=UserInfo['username'])

                if UserFields is None:
                    return JsonResponse({"code": 401, "message": "非法"})

                sendMessageToChat(
                    'login_token_'+token, {'message': {"username": UserInfo['username'], "accessToken": accessToken}})
            ret['accessToken'] = accessToken
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse(CommonResponse.serverError)
