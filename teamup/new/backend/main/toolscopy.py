# import time
# from django.core.paginator import Paginator
# from backend import settings
# import jwt
# import random
# import re
# import random
# import string
# from channels.layers import get_channel_layer
# from asgiref.sync import async_to_sync
# from django.http import JsonResponse
# import requests
# import json
# import hashlib
# from main.config import APP_ID, API_SERCET, RECORD_DISCOUNT_EXPIRE_TIME
# from django.core.cache import cache
# from datetime import datetime


# def checkIsNotEmpty(data, *args):
#     if data is None or len(str(data)) <= 0:
#         return False
#     return True


# def getCurrentTimestamp():
#     current_timestamp = int(time.time())
#     return current_timestamp


# def encrypteToken(self, user):
#     payload = {
#         'username': user.username,
#         'admin': user.admin,
#         'premium': user.premium,
#         'email': user.email,
#         'avator_color': user.avator_color,
#         'create_time': getCurrentTimestamp(),
#         'expire_time': getCurrentTimestamp() + settings.JWT_EXPIRATION_DELTA
#     }
#     token = jwt.encode(payload, settings.JWT_SECRET_KEY,
#                        algorithm=settings.JWT_ALGORITHM)
#     return token.decode('utf8')


# def GenertorCode():
#     return ''.join(random.sample('0123456789', k=6))


# def decodeToken(token):
#     return jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=settings.JWT_ALGORITHM)


# def validateEmailFormat(email):
#     email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
#     if re.match(email_pattern, email):
#         return True
#     else:
#         return False


# def customizePaginator(data, maxSize, pageNum=1):
#     if pageNum in [None, '']:
#         pageNum = 1
#     if type(list()) == type(data):
#         paginator = Paginator(data, maxSize)
#     else:
#         paginator = Paginator(data, maxSize)
#     pageNum = int(pageNum)
#     pageCount = paginator.num_pages
#     if pageNum > pageCount:
#         data = {}
#     else:
#         data = paginator.page(int(pageNum))
#     return data, pageCount


# def randomNum():
#     characters = string.ascii_uppercase + string.digits
#     random_string = ''.join(random.choice(characters) for _ in range(6))
#     return random_string


# def sendMessageToChat(room_name, message):
#     channel_layer = get_channel_layer()
#     async_to_sync(channel_layer.group_send)(
#         room_name,
#         {
#             'type': 'chat_message',
#             'message': message,
#             'username': 'system',
#             'auth': 'temaup_payment_notify_key',
#             'create_time': getCurrentTimestamp()
#         }
#     )


# def generateRandomnumber(length=32):
#     characters = string.ascii_letters + string.digits
#     order_number = ''.join(random.choice(characters) for _ in range(length))
#     return order_number


# def discountPrice(real_price):
#     keys = cache.keys('*')
#     isRepeatDiscount = [
#         key for key in keys if key.startswith("record_discount")]
#     discount = 999.00
#     if real_price >= 46 or real_price >= 46.00:
#         discount = round(random.uniform(real_price-0.10, real_price), 2)
#     else:
#         discount = round(random.uniform(real_price-0.30, real_price), 2)
#     if len(isRepeatDiscount) == 0:
#         cache.set('record_discount'+str(discount),
#                   0, RECORD_DISCOUNT_EXPIRE_TIME)
#         return discount
#     else:
#         while 'record_discount'+str(discount) in isRepeatDiscount:
#             discount = round(random.uniform(real_price-1, real_price), 1)
#         cache.set('record_discount'+str(discount),
#                   0, RECORD_DISCOUNT_EXPIRE_TIME)
#         return discount


# def fromAuthGetUsername(request):
#     authorization_header = request.META.get(
#         'HTTP_AUTHORIZATION', None)
#     if authorization_header is None or authorization_header == '' or authorization_header == 'Bearer':
#         return False
#     payload = decodeToken(
#         authorization_header.replace('Bearer ', ''))
#     return payload['username']


# def post_request(url, data):
#     headers = {'Content-Type': 'application/json; charset=utf-8'}
#     try:
#         response = requests.post(url, proxies={'http': '', 'https': ''}, data=json.dumps(
#             data), headers=headers, verify=False)
#         jsonResult = json.loads(response.text)
#         if jsonResult.get('msg', None) is None:
#             jsonResult['user'] = data['order_uid']
#             return jsonResult
#         else:
#             if jsonResult['msg'] == '商户订单号已存在':
#                 return 'exist'
#             elif jsonResult['msg'] == '没有可用的收款码':
#                 return 'full'
#     except Exception as e:
#         # print(str(e))
#         return 'error'


# def toMD5(text):
#     return hashlib.md5(text.encode()).hexdigest()


# def buildOrderParmas(data, roomId):
#     sign = 'app_id={}&order_no={}&trade_name={}&pay_type={}&order_amount={}&order_uid={}&{}'.format(
#         APP_ID, data["order_id"],  "room|"+str(roomId), "wechat", data['discount_price'], data["user"], API_SERCET)
#     return {"app_id": APP_ID, "order_no": data["order_id"], "trade_name": "room|"+str(roomId),
#             "pay_type": "wechat", "order_amount": data['discount_price'], "order_uid": data["user"], "sign": toMD5(sign)}


# def buildOrderParmasOfAccount(data, usernameOrUserFlag):
#     sign = 'app_id={}&order_no={}&trade_name={}&pay_type={}&order_amount={}&order_uid={}&{}'.format(
#         APP_ID, data["order_id"],  "account|"+usernameOrUserFlag, "wechat", data['discountPrice'], data["user"], API_SERCET)
#     return {"app_id": APP_ID, "order_no": data["order_id"], "trade_name": "account|"+usernameOrUserFlag,
#             "pay_type": "wechat", "order_amount": data['discountPrice'], "order_uid": data["user"], "sign": toMD5(sign)}


# def buildOrderParamasOfDiscount(data, usernameOrUserFlag):
#     sign = 'app_id={}&order_no={}&trade_name={}&pay_type={}&order_amount={}&order_uid={}&{}'.format(
#         APP_ID, data["order_id"],  usernameOrUserFlag, "wechat", data['discountPrice'], data["user"], API_SERCET)
#     return {"app_id": APP_ID, "order_no": data["order_id"], "trade_name": usernameOrUserFlag,
#             "pay_type": "wechat", "order_amount": data['discountPrice'], "order_uid": data["user"], "sign": toMD5(sign)}


# def fromTsToTime(timestamp):
#     dt_object = datetime.fromtimestamp(timestamp)
#     formatted_date = dt_object.strftime("%Y-%m-%d %H:%M:%S")
#     return formatted_date


# def toUseDiscountPrice(real_price):
#     keys = cache.keys('*')
#     isRepeatDiscount = [
#         key for key in keys if key.startswith("record_discount")]
#     discount = round(random.uniform(real_price, real_price+0.10), 2)
#     if len(isRepeatDiscount) == 0:
#         cache.set('record_discount'+str(discount),
#                   0, RECORD_DISCOUNT_EXPIRE_TIME)
#         return discount
#     else:
#         while 'record_discount'+str(discount) in isRepeatDiscount:
#             discount = round(random.uniform(real_price, real_price+0.10), 2)
#         cache.set('record_discount'+str(discount),
#                   0, RECORD_DISCOUNT_EXPIRE_TIME)
#         return discount


# # 包含大小写的随机字符
# def generate_random_string():
#     length = random.randint(6, 10)  # 生成长度在6到10之间的随机数
#     characters = string.ascii_letters  # 获取所有大小写字母
#     random_string = ''.join(random.choice(characters) for _ in range(length))
#     return random_string


# def generate_random_color():
#     # 生成6个随机的十六进制字符
#     color = '#' + ''.join(random.choice('0123456789ABCDEF') for _ in range(6))
#     return color


# def generate_random_Upper_string():
#     length = 6
#     characters = string.ascii_uppercase  # 获取所有大写字母
#     random_string = ''.join(random.choice(characters) for _ in range(length))
#     return random_string


# def getClientIp(request):
#     return request.META.get('HTTP_X_REAL_IP', '')
