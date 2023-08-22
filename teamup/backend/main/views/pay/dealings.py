from django.http import JsonResponse
from rest_framework.views import APIView
from main.contants import CommonErrorcode, RoomResponseCode, PayResponseCode, PayStateResponseCode
import json
from main.tools import sendMessageToChat, getCurrentTimestamp
from django.core.cache import cache
from main.task import checkAllUserPayed
from main.config import ORDER_LIFEYCLE
from main.models import Order


class Pay(APIView):

    # 支付回调
    def put(self, request, *args, **kwargs):
        try:
            roomId = json.loads(request.body).get('room_id', None)
            orderId = json.loads(request.body).get('order_id', None)

            if roomId == '' or roomId is None:
                return JsonResponse(CommonErrorcode.paramsError)
            if orderId == '' or orderId is None:
                return JsonResponse(CommonErrorcode.paramsError)

            memoryTeamAllPayOrder = cache.get(
                'pay_room_'+str(roomId), None)

            if memoryTeamAllPayOrder is None:
                return JsonResponse(RoomResponseCode.notDeparture)

            serializeMemoryTeamAllPayOrder = json.loads(memoryTeamAllPayOrder)

            for i in serializeMemoryTeamAllPayOrder:
                if i["order_id"] == orderId:
                    if i["state"] != 0:
                        return JsonResponse(PayResponseCode.duplicatePay)

                    # change order state
                    Order.objects.filter(order_id=i["order_id"]).update(
                        state=1, payed_qrcode=i["qrcode"], price=i["price"], payed_time=getCurrentTimestamp())

                    i["state"] = 1
                    cache.set('pay_room_'+str(roomId),
                              json.dumps(serializeMemoryTeamAllPayOrder), ORDER_LIFEYCLE)

                    sendMessageToChat('room_'+str(roomId), i['user']+'已付款')
                    checkAllUserPayed.delay(
                        serializeMemoryTeamAllPayOrder, roomId)
                    return JsonResponse(PayResponseCode.paySuccess)

            return JsonResponse(PayResponseCode.payError)

        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)
