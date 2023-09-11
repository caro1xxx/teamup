from django.urls import path
from main.consumers.login import Login
from main.consumers.pay import Notify

websocket_url = [
    path("ws/login/<token>/", Login.as_asgi()),
    path("ws/pay/<no>/", Notify.as_asgi()),
]
