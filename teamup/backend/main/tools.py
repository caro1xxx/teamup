import time
from django.core.mail import send_mail
from backend import settings
import jwt
import random
import re

def checkIsNotEmpty(data, *args):
  if data is None or len(str(data)) <= 0:
      return False
  return True

def getCurrentTimestamp():
    current_timestamp = int(time.time())
    return current_timestamp

def encrypteToken(self,user):
    payload = {
        'username': user.username,
        'admin': user.admin,
        'premium': user.premium,
        'create_time': getCurrentTimestamp(),
        'expire_time':getCurrentTimestamp() + settings.JWT_EXPIRATION_DELTA
    }
    token = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return token.decode('utf-8')

def GenertorCode():
    return ''.join(random.sample('0123456789', k=6))


def validateEmailFormat(email):
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if re.match(email_pattern, email):
        return True
    else:
        return False