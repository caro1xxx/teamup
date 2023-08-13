from django.urls import path
from main.consumers.chat import Chat


websocket_url = [
    path("ws/room/<room_pk>/<access_token>/", Chat.as_asgi()),
]
