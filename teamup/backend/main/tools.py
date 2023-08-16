import time
from django.core.mail import send_mail
from django.core.paginator import Paginator
from backend import settings
import jwt
import random
import re
import random
import string
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


def checkIsNotEmpty(data, *args):
    if data is None or len(str(data)) <= 0:
        return False
    return True


def getCurrentTimestamp():
    current_timestamp = int(time.time())
    return current_timestamp


def encrypteToken(self, user):
    payload = {
        'username': user.username,
        'admin': user.admin,
        'premium': user.premium,
        'email': user.email,
        'avator_color': user.avator_color,
        'create_time': getCurrentTimestamp(),
        'expire_time': getCurrentTimestamp() + settings.JWT_EXPIRATION_DELTA
    }
    token = jwt.encode(payload, settings.JWT_SECRET_KEY,
                       algorithm=settings.JWT_ALGORITHM)
    return token.decode('utf-8')


def GenertorCode():
    return ''.join(random.sample('0123456789', k=6))


def decodeToken(token):
    return jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=settings.JWT_ALGORITHM)


def validateEmailFormat(email):
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if re.match(email_pattern, email):
        return True
    else:
        return False


def customizePaginator(data, maxSize, pageNum=1):
    if pageNum in [None, '']:
        pageNum = 1
    if type(list()) == type(data):
        paginator = Paginator(data, maxSize)
    else:
        paginator = Paginator(data, maxSize)
    pageNum = int(pageNum)
    pageCount = paginator.num_pages
    if pageNum > pageCount:
        data = {}
    else:
        data = paginator.page(int(pageNum))
    return data, pageCount


def randomNum():
    characters = string.ascii_uppercase + string.digits
    random_string = ''.join(random.choice(characters) for _ in range(6))
    return random_string


def sendMessageToChat(room_name, message):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        room_name,
        {
            'type': 'chat_message',
            'message': message,
            'username': 'system',
            'create_time': getCurrentTimestamp()
        }
    )


def generateRandomnumber(length=32):
    characters = string.ascii_letters + string.digits
    order_number = ''.join(random.choice(characters) for _ in range(length))
    return order_number
