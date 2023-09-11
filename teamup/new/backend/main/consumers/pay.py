from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.core.cache import cache
from main.response import CommonResponse


class Notify(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

        self.no = self.scope['url_route']['kwargs']['no']

        if self.no is None or self.no == '':
            await self.send(text_data=json.dumps(CommonResponse.parmasError))
            self.close()

        self.orderPayNotifyRoom = 'pay_notify_'+self.no

        if cache.get(self.orderPayNotifyRoom, None) == None:
            await self.send(text_data=json.dumps({'code': 404, "message": '订单不存在'}))
            self.close()

        await self.channel_layer.group_add(
            self.orderPayNotifyRoom,
            self.channel_name
        )

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        pass

    async def chat_message(self, event):
        messageBody = {
            'no': event['message']['no'],
            'pay_time': event['create_time'],
            'username': event['message']['username'],
            'password': event['message']['password'],
            'seat_number': event['message']['seat_number'],
            'seat_pin': event['message']['seat_pin'],
            'expire_time': event['message']['expire_time'],
        }

        await self.send(text_data=json.dumps(messageBody))
