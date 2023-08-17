from django.http import JsonResponse
from rest_framework.views import APIView
from main.contants import CommonErrorcode, RoomResponseCode, PayResponseCode
import json
from main.tools import sendMessageToChat
from django.core.cache import cache


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
                        return JsonResponse(PayResponseCode.PayResponseCode)
                    i["state"] = 1
                    cache.set('pay_room_'+str(roomId),
                              json.dumps(serializeMemoryTeamAllPayOrder), 60 * 60 * 1)
                    sendMessageToChat('room_'+str(roomId), i['user']+'已付款')
                    return JsonResponse(PayResponseCode.paySuccess)

            return JsonResponse(PayResponseCode.payError)

        except Exception as e:
            print(str(e))
            return JsonResponse(CommonErrorcode.serverError)
