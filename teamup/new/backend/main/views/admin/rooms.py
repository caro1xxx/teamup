from django.http import JsonResponse
from rest_framework.views import APIView
from main.contants import CommonErrorcode
from main.models import User, Room, Account
from django.core import serializers
import json
from django.core.cache import cache
from main.tools import generate_random_string, getCurrentTimestamp, generate_random_color, generate_random_Upper_string, generateRandomnumber
from main.config import ROOM_LIFECYCLE
from main.task import batchChangePasswordMail


# 评论添加机器人并创建房间
class batchFakeUserToRoom(APIView):
    def get(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '获取成功'}
        try:
            count = request.GET.get('userCount', None)
            roomState = request.GET.get('roomState', None)
            roomTitle = request.GET.get('roomTitle', None)
            roomDescription = request.GET.get('roomDescription', None)
            roomType = int(request.GET.get('roomType', None))

            admin = request.payload_data['admin']

            if admin == 0:
                return JsonResponse({'code': 500, 'message': '非法'})

            createUsers = []
            userNameList = []
            for i in range(0, int(count)):
                user = generate_random_string()
                createUsers.append(User(username=user, password='72d0544b894823bc37163600eaf526e5', create_time=getCurrentTimestamp(
                ), avator_color=generate_random_color(), email=generate_random_string()+'@teamup.best', premium=1))
                userNameList.append(user)

            User.objects.bulk_create(createUsers)

            allFakeUserFields = User.objects.filter(
                username__in=userNameList).all()

            roomFields = Room.objects.create(name=roomTitle, description=roomDescription, create_time=getCurrentTimestamp(), uuid=generate_random_Upper_string(
            ), state=int(roomState), creator=allFakeUserFields[0], type_id=roomType, take_seat_quorum=len(allFakeUserFields))

            for i in allFakeUserFields:
                roomFields.users.add(i.pk)
                roomFields.save()

            cache.set('room_' + str(roomFields.pk),
                      json.dumps({}), ROOM_LIFECYCLE)

            return JsonResponse({'code': 200, 'message': 'success'})
        except Exception as e:
            print(str(e))
            return JsonResponse(CommonErrorcode.serverError)


# 批量修改账号密码并发送邮件通知
class batchChangeRoomAccountsPassword(APIView):
    # 手动修改密码  群发邮件
    def post(self, request, *args, **kwargs):
        try:
            account = json.loads(request.body).get('account', None)

            admin = request.payload_data['admin']

            if admin == 0:
                return JsonResponse(CommonErrorcode.illegallyError)

            accountFields = Account.objects.filter(username=account).all()

            mailNotify = []
            newPassword = generateRandomnumber(8)
            for account in accountFields:
                mailNotify.append(
                    {"username": account.username, "password": account.password, "email": account.distribute_user.email})
                account.password = newPassword
                account.save()

            batchChangePasswordMail.delay(mailNotify)

            return JsonResponse({"code": 200, "message": '批量修改成功', 'password': newPassword})
        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)
