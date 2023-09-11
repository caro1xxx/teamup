from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from main.response import CommonResponse
from main.models import User, Account, Order
from django.core import serializers
from main.tools import encrypteToken, getCurrentTimestamp
import json
from django.db.models import Case, When, Value, IntegerField, Sum


class Login(APIView):
    def post(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '获取成功'}
        try:
            username = json.loads(request.body).get('username', None)
            password = json.loads(request.body).get('password', None)

            UserFields = User.objects.filter(
                username=username, password=password, level=1).first()

            if UserFields is None:
                return JsonResponse({"code": 401, "message": "非法"})
            accessToken = encrypteToken(self, {"username": UserFields.username,
                                               "level": UserFields.level, "email": UserFields.email})
            ret['accessToken'] = accessToken
            ret['username'] = username
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse(CommonResponse.serverError)


class Stockpiles(APIView):
    def get(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '获取成功'}
        try:
            level = request.payload_data['level']
            if level != 1:
                JsonResponse({"code": 401, "message": "非法"})

            data = Account.objects.values('type__name', 'region').annotate(
                stock=Sum(
                    Case(
                        When(user_buy_expire_time=0, state=True, then=1),
                        default=0,
                        output_field=IntegerField()
                    )
                ),
                sells=Sum(
                    Case(
                        When(user_buy_expire_time__gt=0, state=True, then=1),
                        default=0,
                        output_field=IntegerField()
                    )
                )
            )

            ret['data'] = list(data)
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse(CommonResponse.serverError)


class PayOrder(APIView):
    def get(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '获取成功'}
        try:
            level = request.payload_data['level']
            if level != 1:
                JsonResponse({"code": 401, "message": "非法"})

            allSuccessOrder = Order.objects.filter(state=True).all()
            data = []

            for order in allSuccessOrder:
                data.append({"no": order.no, "price": order.order_amount, "state": order.state, "expirce_time": Account.objects.filter(
                    order__no=order.no).first().user_buy_expire_time, "user": order.order_uid.username, "type": order.trade_name})

            ret['data'] = data
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse(CommonResponse.serverError)


class Charge(APIView):
    def get(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '获取成功'}
        try:
            level = request.payload_data['level']
            if level != 1:
                JsonResponse({"code": 401, "message": "非法"})

            needChargeAccounts = Account.objects.filter(
                state=True, expire_time__lt=getCurrentTimestamp() + 60*60*24 * 2).all()
            data = []

            for account in needChargeAccounts:
                data.append({"username": account.username,
                            "type": account.type.name, "expire_time": account.expire_time})

            ret['data'] = data
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse(CommonResponse.serverError)
