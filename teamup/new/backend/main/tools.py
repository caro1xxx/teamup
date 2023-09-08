from backend import settings
import string
import time
import random
import jwt
import hashlib
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


def decodeToken(token):
    return jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=settings.JWT_ALGORITHM)


def encrypteToken(self, user):
    payload = {
        'username': user['username'],
        'level': user['level'],
        'email': user['email'],
        'create_time': getCurrentTimestamp(),
        'expire_time': getCurrentTimestamp() + settings.JWT_EXPIRATION_DELTA
    }
    token = jwt.encode(payload, settings.JWT_SECRET_KEY,
                       algorithm=settings.JWT_ALGORITHM)
    return token.decode('utf8')


def getClientIp(request):
    return request.META.get('HTTP_X_REAL_IP', '')


def randomString(length):
    characters = string.digits + string.ascii_lowercase
    random_string = ''.join(random.choice(characters) for _ in range(length))
    return random_string


def getCurrentTimestamp():
    current_timestamp = int(time.time())
    return current_timestamp


def checkParams(parmas):
    for p in parmas:
        if p == '' or p is None:
            return False
    return True


def toMD5(text):
    return hashlib.md5(text.encode()).hexdigest()


def sendMessageToChat(token, message):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        token,
        {
            'type': 'chat_message',
            'message': message,
            'create_time': getCurrentTimestamp()
        }
    )
