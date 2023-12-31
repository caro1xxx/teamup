from channels.routing import ProtocolTypeRouter, URLRouter
from main.routing import websocket_url


application = ProtocolTypeRouter({
    "websocket": URLRouter(
        websocket_url
    )
})
