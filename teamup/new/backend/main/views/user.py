from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from main.response import CommonResponse
import json
from django.core.cache import cache
from main.models import User, Account, Order
from main.config import loginRoomMemoryExsitTime, loginSuccessExpireTime
from main.tools import toMD5, sendMessageToChat, encrypteToken, randomString, getCurrentTimestamp, decodeToken
from main.task import sendMail, sendMessageToAdmin


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
            email = json.loads(request.body).get('email', None)
            accessToken = json.loads(request.body).get('accessToken', None)
            if accessToken is None:
                if toMD5(token) != sign:
                    return JsonResponse({"code": 401, "message": "非法"})

                UserFields = User.objects.create(username=randomString(
                    8), level=0, email=email, create_time=getCurrentTimestamp())
                # 生成AccessToken
                accessToken = encrypteToken(self, {"username": UserFields.username,
                                                   "level": UserFields.level, "email": UserFields.email})
                sendMail.delay(
                    '绑定邮箱通知', {"title": "绑定邮箱通知", "message": "感谢您的注册"}, email)
                sendMessageToChat(
                    'login_token_'+token, {'message': {"username": UserFields.username, "accessToken": accessToken}})
            else:
                UserInfo = decodeToken(accessToken)
                UserFields = User.objects.filter(username=UserInfo['username'])
                if UserFields is None:
                    return JsonResponse({"code": 401, "message": "非法"})
                sendMessageToChat(
                    'login_token_'+token, {'message': {"username": UserInfo['username'], "accessToken": accessToken}})

            cache.set('login_token_success_'+token,
                      accessToken, loginSuccessExpireTime)
            ret['accessToken'] = accessToken
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse(CommonResponse.serverError)

    def put(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': 'success'}
        try:
            token = json.loads(request.body).get('token', None)
            isLoginSuccess = cache.get('login_token_success_'+token, None)
            if isLoginSuccess is None:
                return JsonResponse({"code": 410, "message": "未扫码"})

            username = decodeToken(isLoginSuccess)['username']
            ret['accessToken'] = isLoginSuccess
            ret['username'] = username
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse(CommonResponse.serverError)


class History(APIView):
    def get(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': 'success'}
        try:
            username = request.payload_data['username']

            AccountsFields = Account.objects.filter(
                dispatch_user__username=username).all()

            allAccounts = []

            for account in AccountsFields:
                allAccounts.append({"type": account.type.name, "username": account.username, "password": account.password,
                                   "seat_number": account.seat_number, "seat_pin": account.seat_pin, "expire_time": account.expire_time, "region": account.region, "no": account.order.no})

            ret["data"] = allAccounts
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse(CommonResponse.serverError)

    # 请求修改密码
    def post(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': 'success'}
        try:
            no = json.loads(request.body).get('no', None)
            account = json.loads(request.body).get('account', None)
            username = request.payload_data['username']

            OrderFileds = Order.objects.filter(
                no=no, order_uid__username=username).first()
            if OrderFileds is None:
                return JsonResponse({"code": 404, "message": "订单不存在"})

            sendMessageToAdmin.delay(
                '新事务,请尽快处理', {"title": "修改密码", "message": '用户:{}需要修改{}账号的密码'.format(username, account)})
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse(CommonResponse.serverError)
