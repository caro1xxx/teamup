from django.shortcuts import render
from django.http import JsonResponse, StreamingHttpResponse, HttpResponse
from rest_framework.views import APIView
from main.models import User, Room
from main.contants import CommonErrorcode, RoomResponseCode, ChatResponseCode
from main.tools import customizePaginator, getCurrentTimestamp, randomNum
from django.core.exceptions import ObjectDoesNotExist
from django.core.cache import cache
import json
from django.views.generic import View
import time

clients = []


class ChatSSE(APIView):
    def connect(request):

        roomPk = request.GET.get('room', None)

        if roomPk is None or roomPk == '':
            return StreamingHttpResponse(json.dumps(CommonErrorcode.paramsError), content_type='text/event-stream')

        try:
            room = Room.objects.get(pk=roomPk)
        except ObjectDoesNotExist:
            return StreamingHttpResponse(json.dumps(ChatResponseCode.chatNoFound), content_type='text/event-stream')

        memoryRoom = cache.get('room_'+roomPk, None)

        if memoryRoom is None:
            return StreamingHttpResponse(json.dumps(ChatResponseCode.chatNoFound), content_type='text/event-stream')

        return StreamingHttpResponse(json.dumps(ChatResponseCode.connectSuccess), content_type='text/event-stream')

        # def send_message_to_another_client():
        #     clients[0].write("hello")

        # response = StreamingHttpResponse(json.dumps(
        #     ChatResponseCode.connectSuccess), content_type='text/event-stream')

        # clients.append(response)

        # send_message_to_another_client()

        # return response
