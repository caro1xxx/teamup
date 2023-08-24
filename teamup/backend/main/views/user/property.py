from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from main.models import Message, Room, UserMail, User
from main.contants import CommonErrorcode
from django.core import serializers
import json
from main.config import USER_NOTIFY_LIST_CACHETIME, USER_FAVORITER_CACHETIME


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

            CommonCode = CommonErrorcode()

            CommonCode.success['data'] = []
            for i in allRooms:
                for n in i.users_favorited.all():
                    if n.username == username:
                        CommonCode.success['data'].append(
                            {"roomName": i.name, "surplus": i.type.max_quorum - i.take_seat_quorum, "pk": i.pk, "roomId": i.uuid, "type": i.type.name, "state": i.state})

            response = JsonResponse(CommonCode.success)

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
