from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from django.core.cache import cache
from main.response import CommonResponse
from main.tools import randomString, getClientIp, checkParams, toMD5, sendMessageToChat, encrypteToken
import json
from main.config import loginRoomMemoryExsitTime
from main.models import User


class Login(APIView):
    def get(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '获取成功'}
        try:
            loginRoomToken = randomString(6)
            while cache.get(loginRoomToken, None) != None:
                loginRoomToken = randomString(6)

            cache.set('login_token_' + loginRoomToken,
                      1, loginRoomMemoryExsitTime)

            ret['token'] = loginRoomToken
            return JsonResponse(ret)
        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonResponse.serverError)

    def post(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '登录成功'}
        try:
            userAgent = json.loads(request.body).get('userAgent', None)
            sign = json.loads(request.body).get('sign', None)
            token = json.loads(request.body).get('token', None)
            ip = getClientIp(request)

            if checkParams([userAgent, sign, token, ip]) == False:
                return JsonResponse(CommonResponse.parmasErrpr)

            # 判断是否是微信
            if 'MicroMessenger' not in userAgent:
                return JsonResponse({'code': 403, 'message': '登录异常'})

            UserFiedls = User.objects.filter(sign=sign).first()
            if UserFiedls is None:
                # 判断是否被篡改
                if toMD5(token) != sign:
                    return JsonResponse({'code': 403, 'message': '登录异常'})
                UserFiedls = User.objects.create(sign=sign)

            accessToken = encrypteToken(self, {"username": UserFiedls.username,
                                               "level": UserFiedls.level, "email": UserFiedls.email})
            sendMessageToChat(
                'login_token_'+token, {'message': {"username": UserFiedls.username, "token": accessToken}})
            return JsonResponse(ret)
        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonResponse.serverError)
