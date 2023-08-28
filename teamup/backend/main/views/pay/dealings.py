from django.http import JsonResponse
from rest_framework.views import APIView
from main.contants import CommonErrorcode, RoomResponseCode, PayResponseCode
import json
from main.tools import sendMessageToChat, getCurrentTimestamp, toMD5
from django.core.cache import cache
from main.task import checkAllUserPayed, generatorAccountOfrPerson
from main.config import ORDER_LIFEYCLE, API_SERCET
from main.models import Order
from django.http import HttpResponse


class Pay(APIView):

    # 支付回调
    def post(self, request, *args, **kwargs):
        try:
            no = request.POST.get("no", None)
            orderId = request.POST.get("order_no", None)
            paymentType = request.POST.get("trade_name", None)
            pay_type = request.POST.get("pay_type", None)
            order_amount = request.POST.get("order_amount", None)
            pay_amount = request.POST.get("pay_amount", None)
            order_uid = request.POST.get("order_uid", None)
            sign = request.POST.get("sign", None)

            text = 'no={}&order_no={}&trade_name={}&pay_type={}&order_amount={}&pay_amount={}&order_uid={}&{}'.format(
                no, orderId, paymentType, pay_type, order_amount, pay_amount, order_uid, API_SERCET)
            mySign = toMD5(text)

            if mySign != sign:
                return JsonResponse(CommonErrorcode.illegallyError)

            if paymentType == '' or paymentType is None:
                return JsonResponse(CommonErrorcode.paramsError)
            if orderId == '' or orderId is None:
                return JsonResponse(CommonErrorcode.paramsError)

            paymentTypeAndOther = paymentType.split('|')
            # 房间发车账号
            if paymentTypeAndOther[0] == 'room':
                roomId = paymentTypeAndOther[1]
                memoryTeamAllPayOrder = cache.get(
                    'pay_room_'+roomId, None)

                if memoryTeamAllPayOrder is None:
                    return JsonResponse(RoomResponseCode.notDeparture)

                serializeMemoryTeamAllPayOrder = json.loads(
                    memoryTeamAllPayOrder)

                for i in serializeMemoryTeamAllPayOrder:
                    if i["order_id"] == orderId:
                        if i["state"] != 0:
                            return JsonResponse(PayResponseCode.duplicatePay)

                        # change order state
                        Order.objects.filter(order_id=i["order_id"]).update(
                            state=1, payed_qrcode=i["qrcode"], price=i["price"], payed_time=getCurrentTimestamp())

                        i["state"] = 1
                        cache.set('pay_room_'+roomId,
                                  json.dumps(serializeMemoryTeamAllPayOrder), ORDER_LIFEYCLE)

                        sendMessageToChat('room_'+roomId, i['user']+'已付款')
                        checkAllUserPayed.delay(
                            serializeMemoryTeamAllPayOrder, roomId, i["order_id"])

                        return HttpResponse("success")
                        # return JsonResponse(PayResponseCode.paySuccess)

                return JsonResponse(PayResponseCode.payError)

            # 店铺账号
            elif paymentTypeAndOther[0] == 'account':
                memoryTeamAllPayOrder = cache.get(
                    'pay_account_'+orderId, None)

                if memoryTeamAllPayOrder is None:
                    return JsonResponse(PayResponseCode.orderNotFound)

                serializeMemoryTeamAllPayOrder = json.loads(
                    memoryTeamAllPayOrder)

                Order.objects.filter(order_id=orderId, state=0).update(
                    state=1, payed_time=getCurrentTimestamp(), payed_qrcode=serializeMemoryTeamAllPayOrder["qrcode"])

                sendMessageToChat('pay_notify_'+orderId, '已付款')

                generatorAccountOfrPerson.delay(
                    orderId, paymentTypeAndOther[1])

                cache.delete('pay_account_'+orderId)

                return HttpResponse("success")
                # return JsonResponse(PayResponseCode.paySuccess)
        except Exception as e:
            print(str(e))
            return JsonResponse(CommonErrorcode.serverError)
