from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from main.models import User, Room
from main.contants import CommonErrorcode, RoomResponseCode
from main.tools import customizePaginator, getCurrentTimestamp, randomNum
import json
from django.core.exceptions import ObjectDoesNotExist
from django.core.cache import cache


class room(APIView):
    # get room list
    def get(self, request, *args, **kwargs):
        try:
            type = request.GET.get('type', None)

            if type is None or type == '':
                return JsonResponse(CommonErrorcode.paramsError)

            rooms = Room.objects.filter(type__name=type).order_by('pk')
            pageInatoredRooms, RoomResponseCode.getSuccess['page_count'] = customizePaginator(
                rooms, 12, request.GET.get('page_num', 1))

            roomAndRoomUser = []
            for room in pageInatoredRooms:
                users_in_room = room.users.all()
                roomAndRoomUser.append({"name": room.name,  "description": room.description,
                                        "pk": room.pk,
                                        "create_time": room.create_time,
                                        "creator": room.creator.username,
                                        "uuid": room.uuid,
                                        "type": room.type.name,
                                        "take_seat_quorum": room.take_seat_quorum,
                                        "surplus": room.type.max_quorum - room.take_seat_quorum,
                                        "users": [user.username for user in users_in_room], })

            RoomResponseCode.getSuccess['data'] = roomAndRoomUser
            return JsonResponse(RoomResponseCode.getSuccess)

        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)

    # create room
    def post(self, request, *args, **kwargs):
        try:
            createDate = json.loads(request.body).get('data', None)

            roomFields = Room.objects.create(
                name=createDate['name'], description=createDate['description'], create_time=getCurrentTimestamp(
                ),
                creator_id=createDate['create_user_id'], type_id=createDate['create_type_id'], take_seat_quorum=0, uuid=randomNum())

            cache.set('room_' + str(roomFields.pk),
                      json.dumps({}), 60 * 60 * 24)
            print(1)
            return JsonResponse(RoomResponseCode.createdSuccess)

        except Exception as e:
            print(str(e))
            return JsonResponse(CommonErrorcode.serverError)


class Team(APIView):
    # get team all people
    def get(self, request, *args, **kwargs):
        try:
            room_pk = request.GET.get('pk', None)

            if room_pk is None or room_pk == '':
                return JsonResponse(CommonErrorcode.paramsError)

            try:
                room = Room.objects.get(pk=room_pk)
            except ObjectDoesNotExist:
                return JsonResponse(RoomResponseCode.roomOrUserNotFound)

            users_in_room = room.users.all()
            user_join_list = [user.username for user in users_in_room]

            RoomResponseCode.getSuccess['data'] = {
                "room_id": room.id,
                "room_name": room.name,
                "users": user_join_list,
                "max_quorum": room.type.max_quorum,
                "surplus": room.type.max_quorum - room.take_seat_quorum,
            }

            return JsonResponse(RoomResponseCode.getSuccess)

        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)

    # join team
    def post(self, request, *args, **kwargs):
        try:
            roomId = json.loads(request.body).get('room_id', None)
            username = json.loads(request.body).get('username', None)

            if roomId is None or roomId == '':
                return JsonResponse(CommonErrorcode.paramsError)
            if username is None or username == '':
                return JsonResponse(CommonErrorcode.paramsError)

            try:
                room = Room.objects.get(pk=roomId)
                user = User.objects.get(username=username)
            except ObjectDoesNotExist:
                return JsonResponse(RoomResponseCode.roomOrUserNotFound)

            if room.take_seat_quorum >= room.type.max_quorum:
                RoomResponseCode.joinError['detail'] = '当前车队已满员'
                return JsonResponse(RoomResponseCode.joinError)

            room.take_seat_quorum += 1
            room.users.add(user)
            room.save()

            return JsonResponse(RoomResponseCode.joinSuccess)

        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)

    # out team
    def delete(self, request, *args, **kwargs):
        try:
            roomId = json.loads(request.body).get('room_id', None)
            username = json.loads(request.body).get('username', None)

            if roomId is None or roomId == '':
                return JsonResponse(CommonErrorcode.paramsError)
            if username is None or username == '':
                return JsonResponse(CommonErrorcode.paramsError)

            try:
                room = Room.objects.get(pk=roomId)
                user = User.objects.get(username=username)
            except ObjectDoesNotExist:
                return JsonResponse(RoomResponseCode.roomOrUserNotFound)

            room.users.remove(user)

            room.take_seat_quorum -= 1
            room.save()

            return JsonResponse(RoomResponseCode.quitSuccess)

        except Exception as e:
            print(str(e))
            return JsonResponse(CommonErrorcode.serverError)
