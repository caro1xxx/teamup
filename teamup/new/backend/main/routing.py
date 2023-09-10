from django.urls import path
from main.consumers.login import Login

websocket_url = [
    path("ws/login/<token>/", Login.as_asgi()),
]
