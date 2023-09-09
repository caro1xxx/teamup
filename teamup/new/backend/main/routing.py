from django.urls import path
from main.consumers.pay import Notify
from main.consumers.login import Login

websocket_url = [
    path("ws/notify/<order_id>/", Notify.as_asgi()),
    path("ws/login/<token>/", Login.as_asgi()),
]
