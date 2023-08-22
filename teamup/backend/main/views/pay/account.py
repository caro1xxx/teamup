from django.http import JsonResponse
from rest_framework.views import APIView
from main.contants import CommonErrorcode, PayResponseCode, PayStateResponseCode
import json
from main.models import AccountType, Order, User
from main.tools import discountPrice, fromAuthGetUsername, generateRandomnumber, getCurrentTimestamp
from main.config import ORDER_LIFEYCLE
from django.core.cache import cache


class OrderHandle(APIView):
    # create
    def post(self, request, *args, **kwargs):
        try:
            type = json.loads(request.body).get('type', None)
            time = json.loads(request.body).get('time', None)
            userFlag = json.loads(request.body).get('flag', None)

            if type is None or type == '' or time is None or time == '':
                return JsonResponse(CommonErrorcode.paramsError)

            typeFields = AccountType.objects.filter(
                type=type, time=time).first()

            if typeFields is None:
                return JsonResponse(CommonErrorcode.typeError)

            discount = discountPrice(typeFields.price)
            memoryOrder = {}

            # 用户登录
            if userFlag is None or userFlag == 'None' or userFlag == '':
                username = fromAuthGetUsername(request)

                orderFields = Order.objects.filter(
                    user__username=username, type=type, time=time, state=0).first()

                # 判断订单是否存在mysql
                if orderFields is None:
                    # 在mysql创建订单
                    userFields = User.objects.filter(
                        username=username).first()
                    orderFields = Order.objects.create(
                        order_id=generateRandomnumber(), user=userFields, price=typeFields.price, discount_price=discount, time=time, type=type)

                isMemoryOrder = cache.get(
                    'pay_account_' + orderFields.order_id, None)
                # redis中是否存在订单
                if isMemoryOrder is None:
                    # 存入redis
                    memoryOrder = {"order_id": orderFields.order_id, "user": username, "create_time": getCurrentTimestamp(
                    ), "price": typeFields.price, "discountPrice": discount, "type": type, "time": time, "qrcode": "hello"}
                    cache.set('pay_account_' + orderFields.order_id,
                              json.dumps(memoryOrder), ORDER_LIFEYCLE)
                else:
                    memoryOrder = json.loads(isMemoryOrder)
            # 用户未登录
            else:
                orderFields = Order.objects.filter(
                    userFlag=userFlag, type=type, time=time, state=0).first()

                # 判断订单是否存在mysql
                if orderFields is None:
                    # 在mysql创建订单
                    orderFields = Order.objects.create(
                        order_id=generateRandomnumber(), price=typeFields.price, discount_price=discount, userFlag=userFlag, time=time, type=type)

                isMemoryOrder = cache.get(
                    'pay_account_' + orderFields.order_id, None)
                # redis中是否存在订单
                if isMemoryOrder is None:
                    # 存入redis
                    memoryOrder = {"order_id": orderFields.order_id, "user": 'unknown', "create_time": getCurrentTimestamp(
                    ), "price": typeFields.price, "discountPrice": discount, "type": type, "time": time, "qrcode": "hello"}
                    cache.set('pay_account_' + orderFields.order_id,
                              json.dumps(memoryOrder), ORDER_LIFEYCLE)
                else:
                    memoryOrder = json.loads(isMemoryOrder)

            CommonCode = CommonErrorcode()
            CommonCode.success['order'] = memoryOrder
            return JsonResponse(CommonErrorcode.success)
        except Exception as e:
            print(str(e))
            return JsonResponse(CommonErrorcode.serverError)

    # flush qr
    def put(self, request, *args, **kwargs):
        try:
            orderId = json.loads(request.body).get('order_id', None)

            if orderId is None or orderId == '':
                return JsonResponse(CommonErrorcode.paramsError)

            MemoryOrder = cache.get('pay_account_' + orderId, None)
            if MemoryOrder is None:
                return JsonResponse(PayResponseCode.orderNotFound)

            serializeOrder = json.loads(MemoryOrder)
            serializeOrder['create_time'] = getCurrentTimestamp()
            cache.set('pay_account_' + orderId,
                      json.dumps(serializeOrder), ORDER_LIFEYCLE)
            return JsonResponse(PayStateResponseCode.flushSuccess)
        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)
