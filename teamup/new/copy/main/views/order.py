from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from django.core.cache import cache
from main.response import CommonResponse
from main.tools import discountPrice, randomString, getCurrentTimestamp, sendMessageToChat, checkParams
import json
from main.models import AccountType, Order, Qrcode, Account, AccountGroup
from main.config import payNotifyEsxitTime
from django.http import HttpResponse


class AnOrder(APIView):
    # order
    def get(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '获取成功'}
        try:
            type = request.GET.get('type', None)
            price = request.GET.get('price', None)
            regin = request.GET.get('regin', None)

            if checkParams([type, price, regin]) == False:
                return JsonResponse(CommonResponse.parmasErrpr)

            username = request.payload_data['username']

            # 判断mysql内是否有没有过期的订单
            OrderFields = Order.objects.filter(
                trade_name=type+'￥'+price, buy_account_type=type, order_price=int(price), order_uid=username, state=False, order_time__gt=getCurrentTimestamp()+30, buy_account_regin=regin).first()
            if OrderFields is not None:
                pass
            else:
                # 判断是否存在该类型商品
                TypeFields = AccountType.objects.filter(type=type).all()
                time = 0
                for i in TypeFields:
                    if i.experience_price == price:
                        time = 7
                        break
                    elif i.month_price == price:
                        time = 30
                        break
                    elif i.two_month_price == price:
                        time = 60
                        break
                    elif i.three_month_price == price:
                        time = 90
                        break
                    elif i.half_year_price == price:
                        time = 180
                        break
                    elif i.year_price == price:
                        time = 365
                        break

                if time == 0:
                    return JsonResponse(CommonResponse.parmasErrpr)
                # 创建订单
                OrderFields = Order.objects.create(order_id=randomString(32), buy_account_type=type, buy_account_regin=regin, trade_name=type+'￥'+price,
                                                   order_amount=discountPrice(float(price)), order_uid=username, order_price=int(price), use_time=time)
                Qrcode.objects.create(
                    order=OrderFields, qrcode='', expirce_time=0)

            ret['order'] = {"order_id": OrderFields.order_id, "use_time": OrderFields.use_time,
                            "order_price": OrderFields.order_price, "order_amount": OrderFields.order_amount, "discount_code": OrderFields.discount_code, "order_qrcode": OrderFields.qrcode.qrcode if OrderFields.qrcode.expirce_time > getCurrentTimestamp()+20 else '', "qrcode_expire_time": OrderFields.qrcode.expirce_time}
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse(CommonResponse.serverError)

    # 回调
    def post(self, request, *args, **kwargs):
        try:
            order_id = json.loads(request.body).get('order_id', None)

            # 关联
            OrderFields = Order.objects.filter(
                order_id=order_id, state=False).first()
            TypeFields = AccountType.objects.filter(
                type=OrderFields.buy_account_type, region=OrderFields.buy_account_regin).first()
            AccountFields = Account.objects.filter(
                type=TypeFields, surplus_seat__gt=0, region=OrderFields.buy_account_regin).first()
            AccountGroupFields = AccountGroup.objects.filter(
                account=AccountFields, used=False, expire_time=0).first()
            OrderFields.state = True
            AccountFields.surplus_seat = AccountFields.surplus_seat-1
            OrderFields.accountgroup_id = AccountGroupFields.pk
            OrderFields.expire_time = getCurrentTimestamp() + OrderFields.use_time * \
                60 * 60 * 24
            AccountGroupFields.used = True
            AccountGroupFields.save()
            OrderFields.save()
            AccountFields.save()

            sendMessageToChat(
                'pay_notify_'+order_id, {"message": "success", "username": AccountFields.account, "password": AccountFields.password, "seat_number": AccountGroupFields.seat_number, "seat_pin": AccountGroupFields.seat_pin})
            return HttpResponse("success")
        except Exception as e:
            print(str(e))
            return JsonResponse(CommonResponse.serverError)

    # pay
    def put(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '获取成功'}
        try:
            order_id = json.loads(request.body).get('order_id', None)

            OrderFields = Order.objects.filter(
                order_id=order_id, state=False).first()

            if OrderFields is None:
                return JsonResponse({"code": 404, "message": "订单不存在"})

            QrcodeFields = Qrcode.objects.filter(order=OrderFields).first()

            # 判断该订单是否是首次
            if OrderFields.order_time != 1804235184:
                # 判断二维码是否到期
                if QrcodeFields.expirce_time <= getCurrentTimestamp():
                    OrderFields.order_id = randomString(32)
                    OrderFields.order_amount = discountPrice(float(OrderFields.order_price)) if OrderFields.discount_code == '' else str(
                        discountPrice(float(OrderFields.order_price) / 10 * 9))
                OrderFields.order_time = getCurrentTimestamp()+60 * 5 - 30
                QrcodeFields.qrcode = 1
                QrcodeFields.expirce_time = getCurrentTimestamp()+60 * 5 - 30
                QrcodeFields.save()
                OrderFields.save()
            else:
                OrderFields.order_time = getCurrentTimestamp()+60 * 5 - 30
                QrcodeFields.qrcode = 1
                QrcodeFields.expirce_time = getCurrentTimestamp()+60 * 5 - 30
                QrcodeFields.save()
                OrderFields.save()

            cache.set('pay_notify_'+OrderFields.order_id,
                      1, payNotifyEsxitTime)

            ret['data'] = {'order_qrcode': QrcodeFields.qrcode,
                           "qrcode_expire_time": QrcodeFields.expirce_time, "order_id": OrderFields.order_id, "order_amount": OrderFields.order_amount}
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse(CommonResponse.serverError)


class UseDiscount(APIView):
    def get(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '获取成功'}
        try:
            order_id = request.GET.get('order_id', None)
            code = request.GET.get('code', None)

            OrderFiedls = Order.objects.filter(order_id=order_id).first()
            if OrderFiedls is None:
                return JsonResponse({"code": 404, "message": "订单不存在"})
            if code not in ['666999', 'teamup']:
                return JsonResponse({"code": 404, "message": "折扣码错误"})
            if OrderFiedls.discount_code != '':
                return JsonResponse({"code": 407, "message": "该订单已使用折扣码"})
            OrderFiedls.discount_code = code
            cache.delete("record_discount"+OrderFiedls.order_amount)
            OrderFiedls.order_amount = str(discountPrice(
                float(OrderFiedls.order_price) / 10 * 9))
            OrderFiedls.save()
            ret['order_amount'] = OrderFiedls.order_amount
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse(CommonResponse.serverError)
