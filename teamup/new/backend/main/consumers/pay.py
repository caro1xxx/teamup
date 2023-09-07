from channels.generic.websocket import AsyncWebsocketConsumer
from main.contants import PayResponseCode, CommonErrorcode
from main.tools import getCurrentTimestamp
import json


class Notify(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

        self.OrderId = self.scope['url_route']['kwargs']['order_id']

        if self.OrderId is None or self.OrderId == '':
            await self.send(text_data=json.dumps(PayResponseCode.orderNotFound))
            self.close()

        self.room_name = 'pay_notify_'+self.OrderId

        # 进入房间
        await self.channel_layer.group_add(
            self.room_name,
            self.channel_name
        )

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        receiveMessage = json.loads(text_data)
        auth = receiveMessage.get('auth', None)
        if auth is None or auth == '' or auth != 'temaup_payment_notify_key':
            await self.send(text_data=json.dumps(CommonErrorcode.illegallyError))
            return

        message = receiveMessage['message']
        messageBody = {
            'type': 'chat_message',
            'message': message,
            'create_time': getCurrentTimestamp()
        }

        await self.channel_layer.group_send(
            self.room_name,
            messageBody
        )

    async def chat_message(self, event):
        messageBody = {
            'message': event['message'],
            'create_time': event['create_time'],
        }

        await self.send(text_data=json.dumps(messageBody))
