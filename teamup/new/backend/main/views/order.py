from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework.views import APIView
from main.response import CommonResponse
import json
from main.models import Type, Order, User, Account
from django.core import serializers
from django.core.cache import cache
from main.tools import checkParams, randomString, discountPrice, getCurrentTimestamp, sendMessageToChat, tsToFormatDate
from main.config import payNotifyEsxitTime
from django.db.models import Q
from main.task import sendOrderMail


class AnOrder(APIView):
    def post(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '获取成功'}
        try:
            name = json.loads(request.body).get('name', None)
            username = request.payload_data['username']
            if (checkParams([name])) == False:
                return JsonResponse(CommonResponse.parmasError)
            TypeFields = Type.objects.filter(name=name).first()
            if TypeFields is None:
                return JsonResponse(CommonResponse.parmasError)
            UserFields = User.objects.filter(username=username).first()
            # 判断用户是否还存在下单未请求二维码的订单 或请求了 二维码还没有失效的订单
            OrderFields = Order.objects.filter(Q(qrcode_expire_time__gt=getCurrentTimestamp()+30) | Q(qrcode_expire_time=0), trade_name="{}-{}-{}天".format(TypeFields.name, TypeFields.region,
                                               TypeFields.time), order_uid=UserFields, order_type=TypeFields, state=False).first()
            randomPrice = discountPrice(float(TypeFields.price))
            if OrderFields is None:
                # 创建订单
                OrderFields = Order.objects.create(no=randomString(
                    32), trade_name="{}-{}-{}天".format(TypeFields.name, TypeFields.region, TypeFields.time), order_amount=randomPrice, order_uid=UserFields, order_type=TypeFields, create_time=getCurrentTimestamp())
            else:
                # 判断该订单的discountcode是否还在reids
                isMemoryDiscountPrice = cache.set(
                    'record_discount'+str(OrderFields.order_amount), None)
                if isMemoryDiscountPrice is None:
                    OrderFields.order_amount = randomPrice
                    OrderFields.save()
            ret['order'] = {
                "no": OrderFields.no,
                "trade_name": OrderFields.trade_name,
                "order_amount": OrderFields.order_amount,
                "discount_code": OrderFields.discount_code,
                "create_time": OrderFields.create_time,
                "state": OrderFields.state,
                "qrcode_state": 1 if OrderFields.qrcode_expire_time > getCurrentTimestamp() + 30 else 0
            }
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse(CommonResponse.serverError)


class UseDiscount(APIView):
    def post(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '获取成功'}
        try:
            no = json.loads(request.body).get('no', None)
            code = json.loads(request.body).get('code', None)

            if checkParams([no, code]) == False:
                return JsonResponse(CommonResponse.parmasError)

            if code != '666999' and code != 'teamup':
                return JsonResponse({'code': 404, "message": "折扣码不存在"})

            OrderFields = Order.objects.filter(no=no, state=False).first()
            if OrderFields.discount_code != 'empty':
                return JsonResponse({'code': 409, "message": "该订单已使用过折扣码"})

            print(float(int(OrderFields.order_type.price)/10 * 9))
            OrderFields.order_amount = discountPrice(
                float(int(OrderFields.order_type.price)/10 * 9))
            OrderFields.discount_code = code
            OrderFields.save()
            print(2)

            ret['data'] = {"code": code,
                           "order_amount": OrderFields.order_amount}
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse(CommonResponse.serverError)


class Pay(APIView):
    def get(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '获取成功'}
        try:
            no = request.GET.get('no', None)

            if checkParams([no]) == False:
                return JsonResponse(CommonResponse.parmasError)

            OrderFields = Order.objects.filter(
                no=no, state=False, qrcode_expire_time__gt=getCurrentTimestamp()+20).first()
            ret["qrcode"] = OrderFields.qrcode
            ret["qrcode_expire_time"] = OrderFields.qrcode_expire_time
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse(CommonResponse.serverError)

    def post(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '获取成功'}
        try:
            no = json.loads(request.body).get('no', None)
            if checkParams([no]) == False:
                return JsonResponse(CommonResponse.parmasError)

            OrderFields = Order.objects.filter(no=no, state=False).first()

            if OrderFields is None:
                return JsonResponse({"code": 404, "message": "订单不存在"})

            # 请求spady订单
            pass

            OrderFields.qrcode = randomString(16)
            OrderFields.qrcode_expire_time = getCurrentTimestamp() + 290
            OrderFields.save()
            cache.set('pay_notify_'+no, 1, payNotifyEsxitTime)
            ret['qrcode'] = OrderFields.qrcode
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse(CommonResponse.serverError)


class PayNotify(APIView):
    def post(self, request, *args, **kwargs):
        try:
            no = json.loads(request.body).get('no', None)
            user = json.loads(request.body).get('user', None)

            OrderFields = Order.objects.filter(no=no, state=False).first()

            if OrderFields is None:
                return JsonResponse({"code": 404, "message": "订单不存在"})

            AccountFields = Account.objects.filter(
                region=OrderFields.order_type.region, type=OrderFields.order_type.goods_type, dispatch_user=None, order=None).first()
            UserFields = User.objects.filter(username=user).first()
            AccountFields.dispatch_user = UserFields
            AccountFields.order = OrderFields
            AccountFields.user_buy_expire_time = getCurrentTimestamp(
            ) + OrderFields.order_type.time * 60 * 60 * 24
            OrderFields.state = True
            OrderFields.save()
            AccountFields.save()

            sendMessageToChat("pay_notify_"+no, {"no": no, "username": AccountFields.username, "password": AccountFields.password,
                              "seat_number": AccountFields.seat_number, "seat_pin": AccountFields.seat_pin, "expire_time": AccountFields.user_buy_expire_time})
            sendOrderMail.delay(
                '订单支付成功通知', {"title": "订单支付成功通知", "username": AccountFields.username, "password": AccountFields.password, "seat_number": AccountFields.seat_number, "seat_pin": AccountFields.seat_pin, "expire_time": tsToFormatDate(AccountFields.user_buy_expire_time)}, UserFields.email)

            return HttpResponse('success')
        except Exception as e:
            print(str(e))
            return JsonResponse(CommonResponse.serverError)
