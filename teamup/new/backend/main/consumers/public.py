from channels.generic.websocket import AsyncWebsocketConsumer
import json


class Notify(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

        self.no = 'public_fake_pay'

        await self.channel_layer.group_add(
            self.no,
            self.channel_name
        )

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        pass

    async def chat_message(self, event):
        messageBody = {
            'who': event['message']['who'],
            'type': event['message']['type'],
            'pay_time': event['create_time'],
        }

        await self.send(text_data=json.dumps(messageBody))
