from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from main.models import User, Room, Order, RoomType
from main.contants import CommonErrorcode, RoomResponseCode, PayStateResponseCode, TypeInfoResponseCode
from main.tools import customizePaginator, getCurrentTimestamp, sendMessageToChat, generateRandomnumber, checkIsNotEmpty, decodeToken
import json
from django.core.exceptions import ObjectDoesNotExist
from django.core.cache import cache
from main.task import sendDepartureNotify
from main.config import ROOM_LIFECYCLE, ORDER_LIFEYCLE


class Rooms(APIView):
    # get room list
    def get(self, request, *args, **kwargs):
        try:
            type = request.GET.get('type', None)
            orderby = request.GET.get('order_by', None)
            search = request.GET.get('search', None)

            if type is None or type == '':
                return JsonResponse(CommonErrorcode.paramsError)

            roomResponse = RoomResponseCode()
            rooms = []
            if search == 'None':
                if orderby == 'self':
                    authorization_header = request.META.get(
                        'HTTP_AUTHORIZATION', None)

                    if authorization_header is None or authorization_header == '' or authorization_header == 'Bearer':
                        return JsonResponse(CommonErrorcode.authError)

                    payload = decodeToken(
                        authorization_header.replace('Bearer ', ''))
                    if payload['username'] is None or payload['username'] == '':
                        return JsonResponse(CommonErrorcode.authError)

                    rooms = Room.objects.filter(
                        creator_id=payload['username']).all()
                else:
                    rooms = Room.objects.filter(type__name=type).order_by(
                        '-take_seat_quorum' if orderby is None or orderby == 'None' else "create_time" if orderby == 'asce'else "-create_time")
            else:
                rooms = Room.objects.filter(name__contains=search).all()

            pageInatoredRooms, roomResponse.getSuccess['page_count'] = customizePaginator(
                rooms, 12, request.GET.get('page_num', 1))

            roomAndRoomUser = []

            # 用户未登录
            authorization_header = request.META.get(
                'HTTP_AUTHORIZATION', None)
            if authorization_header is None or authorization_header == '' or authorization_header == 'Bearer':
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
                                            "users": [{"user": user.username, "avator_color": user.avator_color} for user in users_in_room], "stateType": room.type.type})
            # 已登录的用户 那么获取用户收藏
            else:
                payload = decodeToken(
                    authorization_header.replace('Bearer ', ''))
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
                                            "users": [{"user": user.username, "avator_color": user.avator_color} for user in users_in_room],
                                            "favorited": 1 if room.users_favorited.filter(username=payload["username"]).exists() else 0, "stateType": room.type.type})

            roomResponse.getSuccess['data'] = roomAndRoomUser
            return JsonResponse(roomResponse.getSuccess)

        except Exception as e:
            print(str(e))
            return JsonResponse(CommonErrorcode.serverError)

    # create room
    def post(self, request, *args, **kwargs):
        try:
            createDate = json.loads(request.body).get('data', None)

            if not checkIsNotEmpty(createDate):
                return JsonResponse(CommonErrorcode.paramsError)

            username = request.payload_data['username']
            parmasList = ['name', 'description',
                          'type', 'uuid', 'mailType', 'time']
            for i in parmasList:
                insertI = createDate.get(i, None)
                if insertI is None or insertI == '':
                    return JsonResponse(CommonErrorcode.paramsError)

            typeFields = RoomType.objects.filter(
                name=createDate['type'], level__contains=createDate['time'], type=createDate["mailType"]).first()

            if typeFields is None:
                return JsonResponse(CommonErrorcode.typeError)

            roomFields = Room.objects.create(
                name=createDate['name'], description=createDate['description'], create_time=getCurrentTimestamp(), uuid=createDate['uuid'], state=0, creator_id=username, type_id=typeFields.pk, take_seat_quorum=0)

            user = User.objects.get(username=username)

            # auto join team
            roomFields.take_seat_quorum += 1
            roomFields.users.add(user)
            roomFields.save()

            # create room to redis
            cache.set('room_' + str(roomFields.pk),
                      json.dumps({}), ROOM_LIFECYCLE)

            roomResponse = RoomResponseCode()
            roomResponse.createdSuccess["data"] = {"name": roomFields.name,  "description": roomFields.description,
                                                   "pk": roomFields.pk,
                                                   "create_time": roomFields.create_time,
                                                   "creator": roomFields.creator.username,
                                                   "uuid": roomFields.uuid,
                                                   "type": roomFields.type.name,
                                                   "take_seat_quorum": roomFields.take_seat_quorum,
                                                   "surplus": roomFields.type.max_quorum - roomFields.take_seat_quorum,
                                                   "users": [{"user": user.username, "avator_color": user.avator_color}], "stateType": roomFields.type.type}
            return JsonResponse(roomResponse.createdSuccess)

        except Exception as e:
            # print(str(e))
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
            user_join_list = [{"username": user.username,
                               "avator_color": user.avator_color} for user in users_in_room]

            RoomResponseCode.getSuccess['data'] = {
                "room_id": room.id,
                "homeowner": room.creator.username,
                "state": room.state,
                "room_name": room.name,
                "users": user_join_list,
                "max_quorum": room.type.max_quorum,
                "price": room.type.price / len(user_join_list),
                "level": room.type.level,
                "type": room.type.type,
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

            if roomId is None or roomId == '':
                return JsonResponse(CommonErrorcode.paramsError)

            username = request.payload_data['username']

            try:
                room = Room.objects.get(pk=roomId)
                user = User.objects.get(username=username)
            except ObjectDoesNotExist:
                return JsonResponse(RoomResponseCode.roomOrUserNotFound)

            if room.state != 0:
                return JsonResponse(RoomResponseCode.fleetDepartureed)

            if room.take_seat_quorum >= room.type.max_quorum:
                return JsonResponse(RoomResponseCode.joinErrorMax)

            users_in_room = room.users.all()
            user_join_list = [user.username for user in users_in_room]

            if username in user_join_list:
                return JsonResponse(RoomResponseCode.joinRepet)

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

            if roomId is None or roomId == '':
                return JsonResponse(CommonErrorcode.paramsError)

            username = request.payload_data['username']

            try:
                room = Room.objects.get(pk=roomId)
                user = User.objects.get(username=username)
            except ObjectDoesNotExist:
                return JsonResponse(RoomResponseCode.roomOrUserNotFound)

            if room.creator.username == username:
                return JsonResponse(RoomResponseCode.quitError)

            if room.state != 0:
                return JsonResponse(RoomResponseCode.quitErrorDepartureed)

            users_in_room = room.users.all()
            user_join_list = [user.username for user in users_in_room]

            if username not in user_join_list:
                return JsonResponse(RoomResponseCode.quitErrorNotFound)

            room.users.remove(user)

            room.take_seat_quorum -= 1
            room.save()

            return JsonResponse(RoomResponseCode.quitSuccess)

        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)


class Handler(APIView):
    # 聊天框其他功能
    def get(self, request, *args, **kwargs):
        try:
            room_pk = request.GET.get('room_pk', None)

            if room_pk == '' or room_pk is None:
                return JsonResponse(CommonErrorcode.paramsError)

            try:
                room = Room.objects.get(pk=room_pk)
            except ObjectDoesNotExist:
                return JsonResponse(RoomResponseCode.roomOrUserNotFound)

            users_in_room = room.users.all()
            user_join_list = [user.username for user in users_in_room]

            RoomResponseCode.getSuccess['data'] = user_join_list
            RoomResponseCode.getSuccess['leader'] = room.creator.username
            return JsonResponse(RoomResponseCode.getSuccess)

        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)

    # 车队发车
    def post(self, request, *args, **kwargs):
        try:
            roomId = json.loads(request.body).get('room_id', None)

            if roomId is None or roomId == '':
                return JsonResponse(CommonErrorcode.paramsError)

            username = request.payload_data['username']

            try:
                room = Room.objects.get(pk=roomId)
            except ObjectDoesNotExist:
                return JsonResponse(RoomResponseCode.roomOrUserNotFound)

            if room.creator.username != username:
                return JsonResponse(CommonErrorcode.illegallyError)

            if room.state != 0:
                return JsonResponse(RoomResponseCode.fleetDepartureed)

            if room.take_seat_quorum == 0:
                RoomResponseCode.fleetDepartureError['message'] = '发车失败,人数不足'
                return JsonResponse(RoomResponseCode.fleetDepartureError)

            room.state = 1
            room.save()

            try:
                users_in_room = room.users.all()
                users_email = [user.email for user in users_in_room]
                priceOfItem = room.type.price / room.take_seat_quorum
                currentStampTime = getCurrentTimestamp()

                ordersInsert = []
                for user in users_in_room:
                    ordersInsert.append(Order(order_id=generateRandomnumber(),
                                              state=0, price=priceOfItem, qrcode='/wechat/test.png', room=room, user=user, create_time=currentStampTime, qr_expire_time=currentStampTime+60*3))

                OrdersFields = Order.objects.bulk_create(ordersInsert)

                ordersSerialize = []
                for i in OrdersFields:
                    ordersSerialize.append({"order_id": i.order_id, "state": i.state, "price": i.price,
                                           "qrcode": i.qrcode, "user": i.user.username, "avatorColor": i.user.avator_color, "create_time": i.create_time})

                cache.set('pay_room_' + str(roomId),
                          json.dumps(ordersSerialize), ORDER_LIFEYCLE)

                sendMessageToChat('room_'+str(roomId), '队长'+username+'已发车')

                sendDepartureNotify.delay('Temaup车队@您加入的'+room.name +
                                          room.type.name+'车队已发车', users_email)
            except Exception as e:
                print(str(e))
                room.state = 0
                room.save()
                return JsonResponse(CommonErrorcode.serverError)

            return JsonResponse(RoomResponseCode.fleetDepartureSuccess)

        except Exception as e:
            print(str(e))
            return JsonResponse(CommonErrorcode.serverError)

    # favorite
    def put(self, request, *args, **kwargs):
        roomPk = json.loads(request.body).get('room_pk', None)
        type = json.loads(request.body).get('type', None)

        if roomPk is None or roomPk == '' or type is None or type == '':
            return JsonResponse(CommonErrorcode.paramsError)

        username = request.payload_data['username']

        try:
            room = Room.objects.get(pk=roomPk)
            users = User.objects.get(username=username)
        except ObjectDoesNotExist:
            return JsonResponse(RoomResponseCode.roomOrUserNotFound)

        if type == 0:
            room.users_favorited.remove(users)
        else:
            room.users_favorited.add(users)
        room.save()

        return JsonResponse(RoomResponseCode.favoriteSuccess)


class PayState(APIView):
    # 获取车队支付状态以及自己的付款码
    def get(self, request, *args, **kwargs):
        try:
            room_pk = request.GET.get('room_pk', None)

            if room_pk == '' or room_pk is None:
                return JsonResponse(CommonErrorcode.paramsError)

            username = request.payload_data['username']

            try:
                room = Room.objects.get(pk=room_pk)
            except ObjectDoesNotExist:
                return JsonResponse(RoomResponseCode.roomOrUserNotFound)

            users_in_room = room.users.all()
            users_join_list = [user.username for user in users_in_room]
            if username not in users_join_list:
                return JsonResponse(RoomResponseCode.quitErrorNotFound)

            memoryTeamAllPayOrder = cache.get(
                'pay_room_'+str(room_pk), None)

            if memoryTeamAllPayOrder is None:
                return JsonResponse(RoomResponseCode.notDeparture)

            PayStateResponseCode.teamAllPayOrder['data'] = json.loads(
                memoryTeamAllPayOrder)
            return JsonResponse(PayStateResponseCode.teamAllPayOrder)

        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)

    # 刷新二维码
    def put(self, request, *args, **kwargs):
        try:
            roomId = json.loads(request.body).get('room_id', None)

            if roomId is None or roomId == '':
                return JsonResponse(CommonErrorcode.paramsError)

            username = request.payload_data['username']

            memoryTeamAllPayOrder = cache.get(
                'pay_room_'+str(roomId), None)

            if memoryTeamAllPayOrder is None:
                return JsonResponse(RoomResponseCode.notDeparture)

            serializeMemoryTeamAllPayOrder = json.loads(memoryTeamAllPayOrder)

            for i in serializeMemoryTeamAllPayOrder:
                if i["user"] == username:
                    i["create_time"] = getCurrentTimestamp()
                    cache.set('pay_room_'+str(roomId),
                              json.dumps(serializeMemoryTeamAllPayOrder), ORDER_LIFEYCLE)
                    return JsonResponse(PayStateResponseCode.flushSuccess)

            return JsonResponse(PayStateResponseCode.flushError)

        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)


class TypeInfo(APIView):
    def get(self, request, *args, **kwargs):
        try:
            type = request.GET.get('type', None)
            time = request.GET.get('time', None)
            mailType = request.GET.get('mail_type', None)

            if type is None or time is None or mailType is None:
                return JsonResponse(CommonErrorcode.paramsError)

            typeFields = RoomType.objects.filter(
                name=type, level__contains=time, type=mailType).first()

            if typeFields is None:
                return JsonResponse(TypeInfoResponseCode.typeNotFound)

            res = {'code': 200, 'message': "获取成功",
                   'price': typeFields.price / typeFields.max_quorum}
            return JsonResponse(res)
        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)
