from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.core.cache import cache
from main.response import CommonResponse


class Login(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

        self.token = self.scope['url_route']['kwargs']['token']

        if self.token is None or self.token == '':
            await self.send(text_data=json.dumps(CommonResponse.parmasErrpr))
            self.close()

        self.loginRoomToken = 'login_token_'+self.token

        if cache.get(self.loginRoomToken, None) == None:
            await self.send(text_data=json.dumps({'code': 404, "token": 'token不存在'}))
            self.close()

        await self.channel_layer.group_add(
            self.loginRoomToken,
            self.channel_name
        )

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        pass

    async def chat_message(self, event):
        messageBody = {
            'username': event['message']['message']['username'],
            'accessToken': event['message']['message']['accessToken'],
            'login_time': event['create_time'],
        }

        await self.send(text_data=json.dumps(messageBody))
