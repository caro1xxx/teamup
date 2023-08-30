from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from main.models import Message, Room, UserMail, User, Account, NeedChangePaaaword
from main.contants import CommonErrorcode
from django.core import serializers
import json
from main.tools import getCurrentTimestamp, generateRandomnumber
from main.config import USER_NOTIFY_LIST_CACHETIME, USER_FAVORITER_CACHETIME
from main.task import batchChangePasswordMail


class Notify(APIView):
    def get(self, request, *args, **kwargs):
        try:
            username = request.payload_data['username']

            messages_for_username = Message.objects.filter(
                receive_user__username=username).all().order_by('-create_time')

            CommonCode = CommonErrorcode()
            CommonCode.success['data'] = json.loads(serializers.serialize(
                'json', messages_for_username, use_natural_foreign_keys=True))
            response = JsonResponse(CommonCode.success)

            response['Cache-Control'] = 'max-age=' + \
                str(USER_NOTIFY_LIST_CACHETIME)

            return response
        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)


class Favorite(APIView):
    def get(self, request, *args, **kwargs):
        try:
            username = request.payload_data['username']

            allRooms = Room.objects.all()

            ret = {'code': 200, 'message': '获取成功'}
            ret['data'] = []
            for i in allRooms:
                for n in i.users_favorited.all():
                    if n.username == username:
                        ret['data'].append(
                            {"roomName": i.name, "surplus": i.type.max_quorum - i.take_seat_quorum, "pk": i.pk, "roomId": i.uuid, "type": i.type.name, "state": i.state})

            response = JsonResponse(ret)

            response['Cache-Control'] = 'max-age=' + \
                str(USER_FAVORITER_CACHETIME)

            return response
        except Exception as e:
            return JsonResponse(CommonErrorcode.serverError)


class Mail(APIView):
    def get(self, request, *args, **kwargs):
        try:
            mail = request.GET.get('mail', None)
            pwd = request.GET.get('pwd', None)

            if mail is None or mail == '' or pwd is None or pwd == '':
                return JsonResponse(CommonErrorcode.paramsError)

            username = request.payload_data['username']

            UserFields = User.objects.filter(username=username).first()

            mailUserFields = UserMail.objects.filter(
                user__username=username).first()
            if mailUserFields is None:
                UserMail.objects.create(
                    email=mail, password=pwd, user=UserFields)
            else:
                mailUserFields.email = mail
                mailUserFields.password = pwd
                mailUserFields.save()

            return JsonResponse(CommonErrorcode.success)
        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.used)


class PayedOrder(APIView):
    def get(self, request, *args, **kwargs):
        try:
            username = request.payload_data['username']

            accountFields = Account.objects.filter(
                distribute_user__username=username).all().order_by('-pk')

            ret = {'code': 200, 'message': '获取成功'}
            ret['data'] = json.loads(
                serializers.serialize('json', accountFields))
            return JsonResponse(ret)
        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.used)


class ChangeAccountPassword(APIView):
    def get(self, request, *args, **kwargs):
        try:
            account = request.GET.get('account', None)
            username = request.payload_data['username']

            if account is None or account == '':
                return JsonResponse(CommonErrorcode.paramsError)

            userFields = User.objects.filter(username=username).first()

            accountFields = Account.objects.filter(
                username=account, distribute_user__id=userFields.pk).first()

            if accountFields is None:
                return JsonResponse(CommonErrorcode.illegallyError)

            NeedChangePaaaword.objects.create(
                group_id=accountFields.getGroupPk, state=0, submit_time=getCurrentTimestamp())

            return JsonResponse({'code': 200, 'message': '正在修改密码,新密码将发送到您的邮箱(10分钟内通知)'})
        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)

    # 手动修改密码  群发邮件
    def post(self, request, *args, **kwargs):
        try:
            account = json.loads(request.body).get('account', None)

            username = request.payload_data['username']

            if username != 'bezos':
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
            print(str(e))
            return JsonResponse(CommonErrorcode.serverError)
