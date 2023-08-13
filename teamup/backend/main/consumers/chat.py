from channels.generic.websocket import AsyncWebsocketConsumer
from django.core.cache import cache
from main.contants import ChatResponseCode
from channels.layers import get_channel_layer
from main.tools import decodeToken, getCurrentTimestamp
import json


class Chat(AsyncWebsocketConsumer):

    async def connect(self):
        await self.accept()

        # 获取参数
        self.roomPk = self.scope['url_route']['kwargs']['room_pk']
        self.access_token = self.scope['url_route']['kwargs']['access_token']

        if self.roomPk is None or self.roomPk == '' or self.access_token is None or self.access_token == '':
            await self.send(text_data=json.dumps(ChatResponseCode.chatNoFound))
            self.close()

        memoryRoom = cache.get('room_'+self.roomPk, None)
        if memoryRoom is None:
            await self.send(text_data=json.dumps(ChatResponseCode.chatNoFound))
            self.close()
        else:
            # 获取合法
            try:
                # 解密jwt
                self.user_info = decodeToken(self.access_token)
                print(self.user_info)
                self.room_room_name = 'room_'+self.roomPk

                # 进入房间
                await self.channel_layer.group_add(
                    self.room_room_name,
                    self.channel_name
                )

                # 广播消息
                await self.channel_layer.group_send(
                    self.room_room_name,
                    {
                        'type': 'chat_message',
                        'message': '欢迎 '+self.user_info['username']+' 进入房间',
                        'username': 'system',
                        'create_time': getCurrentTimestamp()
                    }
                )
                await self.send(text_data=json.dumps(ChatResponseCode.connectSuccess))
            except Exception as e:
                # jwt非法
                await self.send(text_data=json.dumps({
                    'message': '非法'
                }))
                await self.close()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        receiveMessage = json.loads(text_data)
        message = receiveMessage['message']

        await self.channel_layer.group_send(
            self.room_room_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': receiveMessage['username'],
                'create_time': getCurrentTimestamp()
            }
        )

    async def chat_message(self, event):

        await self.send(text_data=json.dumps({
            'message': event['message'],
            'username': event['username'],
            'create_time': event['create_time'],
        }))
