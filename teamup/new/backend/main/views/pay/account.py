from django.http import JsonResponse
from rest_framework.views import APIView
from main.contants import CommonErrorcode, PayResponseCode, PayStateResponseCode
import json
from main.models import AccountType, Order, User
from main.tools import discountPrice, fromAuthGetUsername, generateRandomnumber, getCurrentTimestamp, buildOrderParmasOfAccount, post_request
from main.config import ORDER_LIFEYCLE, PAY_HOST, ACCOUNT_ORDER_LIFEYCLE, ORDER_EXPIRE_TIME
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

            memoryOrder = {}
            # 用户
            if userFlag is None or userFlag == 'None' or userFlag == '':
                username = fromAuthGetUsername(request)
                if username == False:
                    return JsonResponse({"code": 401, "message": "refuse"})

                orderFields = Order.objects.filter(
                    user__username=username, type=type, time=time, state=0).first()
                # 如果数据库内有这个订单
                if orderFields is not None:
                    # 并且这个订单没有到期
                    if orderFields.create_time+ORDER_EXPIRE_TIME > getCurrentTimestamp()+30:
                        isMemoryOrder = cache.get(
                            'pay_account_' + orderFields.order_id, None)
                        memoryOrder = json.loads(isMemoryOrder)
                    # 订单到期 -> 请求订单 -> 修改这条记录并且修改redis内记录
                    else:
                        orderFields.order_id = generateRandomnumber()
                        orderFields.create_time = getCurrentTimestamp()
                        orderFields.discount_price = discountPrice(
                            typeFields.price)
                        memoryOrder = {"order_id": orderFields.order_id, "user": username, "create_time": orderFields.create_time,
                                       "price": typeFields.price, "discountPrice": orderFields.discount_price, "type": type, "time": time, "qrcode": "empty"}
                        orderParams = buildOrderParmasOfAccount(
                            memoryOrder, username)
                        result = post_request(PAY_HOST, orderParams)
                        if result == 'full':
                            return JsonResponse({'code': 418, 'message': '支付通道繁忙,请稍后再试或联系客服'})
                        elif result == 'exist':
                            return JsonResponse({'code': 418, 'message': '订单存在'})
                        elif result == 'error':
                            return JsonResponse({'code': 418, 'message': '刷新失败,请稍后再试'})
                        memoryOrder['qrcode'] = result['qr']
                        cache.set('pay_account_' + orderFields.order_id,
                                  json.dumps(memoryOrder), ACCOUNT_ORDER_LIFEYCLE)
                        orderFields.save()
                # 数据库没有这个订单
                else:
                    userFields = User.objects.filter(username=username).first()
                    orderFields = Order.objects.create(
                        order_id=generateRandomnumber(), user=userFields, price=typeFields.price, discount_price=discountPrice(
                            typeFields.price), time=time, type=type, create_time=getCurrentTimestamp())
                    memoryOrder = {"order_id": orderFields.order_id, "user": username, "create_time": orderFields.create_time,
                                   "price": typeFields.price, "discountPrice": orderFields.discount_price, "type": type, "time": time, "qrcode": "empty"}
                    orderParams = buildOrderParmasOfAccount(
                        memoryOrder, username)
                    result = post_request(PAY_HOST, orderParams)
                    if result == 'full':
                        return JsonResponse({'code': 418, 'message': '支付通道繁忙,请稍后再试或联系客服'})
                    elif result == 'exist':
                        return JsonResponse({'code': 418, 'message': '订单存在'})
                    elif result == 'error':
                        return JsonResponse({'code': 418, 'message': '刷新失败,请稍后再试'})
                    memoryOrder['qrcode'] = result['qr']
                    cache.set('pay_account_' + orderFields.order_id,
                              json.dumps(memoryOrder), ACCOUNT_ORDER_LIFEYCLE)
            # 游客
            else:
                orderFields = Order.objects.filter(
                    userFlag=userFlag, type=type, time=time, state=0).first()

                # 数据库内存在该userFlag的订单
                if orderFields is not None:
                    # 并且没有到期
                    if orderFields.create_time+ORDER_EXPIRE_TIME > getCurrentTimestamp()+30:
                        isMemoryOrder = cache.get(
                            'pay_account_' + orderFields.order_id, None)
                        memoryOrder = json.loads(isMemoryOrder)
                    # 到期 -> 请求订单 -> 修改mysql redis记录
                    else:
                        orderFields.order_id = generateRandomnumber()
                        orderFields.create_time = getCurrentTimestamp()
                        orderFields.discount_price = discountPrice(
                            typeFields.price)
                        memoryOrder = {"order_id": orderFields.order_id, "user": 'guest|'+userFlag, "create_time": orderFields.create_time,
                                       "price": typeFields.price, "discountPrice": orderFields.discount_price, "type": type, "time": time, "qrcode": "empty"}
                        orderParams = buildOrderParmasOfAccount(
                            memoryOrder, memoryOrder['user'])
                        result = post_request(PAY_HOST, orderParams)
                        if result == 'full':
                            return JsonResponse({'code': 418, 'message': '支付通道繁忙,请稍后再试或联系客服'})
                        elif result == 'exist':
                            return JsonResponse({'code': 418, 'message': '订单存在'})
                        elif result == 'error':
                            return JsonResponse({'code': 418, 'message': '刷新失败,请稍后再试'})
                        memoryOrder['qrcode'] = result['qr']
                        cache.set('pay_account_' + orderFields.order_id,
                                  json.dumps(memoryOrder), ACCOUNT_ORDER_LIFEYCLE)
                        orderFields.save()
                # 数据库没有该订单
                else:
                    # 在mysql redis创建订单
                    orderFields = Order.objects.create(
                        order_id=generateRandomnumber(), price=typeFields.price, discount_price=discountPrice(
                            typeFields.price), userFlag=userFlag, time=time, type=type, create_time=getCurrentTimestamp())
                    memoryOrder = {"order_id": orderFields.order_id, "user": 'guest|'+userFlag, "create_time": orderFields.create_time,
                                   "price": typeFields.price, "discountPrice": orderFields.discount_price, "type": type, "time": time, "qrcode": "empty"}
                    orderParams = buildOrderParmasOfAccount(
                        memoryOrder, memoryOrder['user'])
                    result = post_request(PAY_HOST, orderParams)
                    if result == 'full':
                        return JsonResponse({'code': 418, 'message': '支付通道繁忙,请稍后再试或联系客服'})
                    elif result == 'exist':
                        return JsonResponse({'code': 418, 'message': '订单存在'})
                    elif result == 'error':
                        return JsonResponse({'code': 418, 'message': '刷新失败,请稍后再试'})
                    memoryOrder['qrcode'] = result['qr']
                    cache.set('pay_account_' + orderFields.order_id,
                              json.dumps(memoryOrder), ACCOUNT_ORDER_LIFEYCLE)

            ret = {'code': 200, 'message': '获取成功'}
            ret['order'] = memoryOrder
            return JsonResponse(ret)
        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)

    # flush qr
    def put(self, request, *args, **kwargs):
        try:
            orderId = json.loads(request.body).get('order_id', None)
            userFlag = json.loads(request.body).get('flag', None)

            if orderId is None or orderId == '':
                return JsonResponse(CommonErrorcode.paramsError)

            orderFields = Order.objects.filter(order_id=orderId).first()

            if orderFields.create_time + ORDER_EXPIRE_TIME > getCurrentTimestamp() + 30:
                return JsonResponse({'code': 201, 'message': '二维码有效'})

            # 用户
            if userFlag is None or userFlag == 'None' or userFlag == '':
                username = fromAuthGetUsername(request)
                orderFields.order_id = generateRandomnumber()
                orderFields.create_time = getCurrentTimestamp()
                orderFields.discount_price = discountPrice(orderFields.price)
                memoryOrder = {"order_id": orderFields.order_id, "user": username, "create_time": orderFields.create_time,
                               "price": orderFields.price, "discountPrice": orderFields.discount_price, "type": orderFields.type, "time": orderFields.time, "qrcode": "empty"}
                orderParams = buildOrderParmasOfAccount(
                    memoryOrder, username)
                result = post_request(PAY_HOST, orderParams)
                if result == 'full':
                    return JsonResponse({'code': 418, 'message': '支付通道繁忙,请稍后再试或联系客服'})
                elif result == 'exist':
                    return JsonResponse({'code': 418, 'message': '订单存在'})
                elif result == 'error':
                    return JsonResponse({'code': 418, 'message': '刷新失败,请稍后再试'})
                memoryOrder['qrcode'] = result['qr']
                cache.set('pay_account_' + orderFields.order_id,
                          json.dumps(memoryOrder), ACCOUNT_ORDER_LIFEYCLE)
                orderFields.save()
            # 游客
            else:
                orderFields.order_id = generateRandomnumber()
                orderFields.create_time = getCurrentTimestamp()
                orderFields.discount_price = discountPrice(
                    orderFields.price)
                memoryOrder = {"order_id": orderFields.order_id, "user": 'guest|'+userFlag, "create_time": orderFields.create_time,
                               "price": orderFields.price, "discountPrice": orderFields.discount_price, "type": orderFields.type, "time": orderFields.time, "qrcode": "empty"}
                orderParams = buildOrderParmasOfAccount(
                    memoryOrder, memoryOrder['user'])
                result = post_request(PAY_HOST, orderParams)
                if result == 'full':
                    return JsonResponse({'code': 418, 'message': '支付通道繁忙,请稍后再试或联系客服'})
                elif result == 'exist':
                    return JsonResponse({'code': 418, 'message': '订单存在'})
                elif result == 'error':
                    return JsonResponse({'code': 418, 'message': '刷新失败,请稍后再试'})
                memoryOrder['qrcode'] = result['qr']
                cache.set('pay_account_' + orderFields.order_id,
                          json.dumps(memoryOrder), ACCOUNT_ORDER_LIFEYCLE)
                orderFields.save()

            ret = {'code': 200, 'message': '刷新成功'}
            ret['order'] = memoryOrder
            return JsonResponse(ret)
        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)
