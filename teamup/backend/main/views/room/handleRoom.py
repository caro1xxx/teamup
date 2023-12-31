from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from main.models import User, Room, Order, RoomType, DiscountCode
from main.contants import CommonErrorcode, RoomResponseCode, PayStateResponseCode, TypeInfoResponseCode, CodeResonseCode
from main.tools import customizePaginator, getCurrentTimestamp, generateRandomnumber, checkIsNotEmpty, decodeToken, discountPrice, post_request, buildOrderParmas, sendMessageToChat, buildOrderParamasOfDiscount, toUseDiscountPrice
import json
from django.core.exceptions import ObjectDoesNotExist
from django.core.cache import cache
from main.task import sendDepartureNotify
from main.config import ROOM_LIFECYCLE, ORDER_LIFEYCLE, TYPE_PRICE_CACHETIME, PAY_HOST, ACCOUNT_ORDER_LIFEYCLE
from concurrent.futures import ThreadPoolExecutor
from django.db.models import Case, When, IntegerField, Value


class Rooms(APIView):
    # get room list
    def get(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '获取成功'}
        try:
            type = request.GET.get('type', None)
            orderby = request.GET.get('order_by', None)
            search = request.GET.get('search', None)

            if type is None or type == '':
                return JsonResponse(CommonErrorcode.paramsError)

            roomResponse = RoomResponseCode()
            rooms = []

            custom_order = Case(
                # take_seat_quorum等于5的记录优先级为2
                When(take_seat_quorum=5, then=Value(2)),
                default=Value(1),  # 其他情况的记录优先级为1
                output_field=IntegerField(),
            )

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
                    if orderby is None or orderby == 'None':
                        rooms = Room.objects.filter(type__name=type).annotate(
                            custom_order=custom_order).order_by('custom_order', '-take_seat_quorum')
                    elif orderby == 'asce':
                        rooms = Room.objects.filter(
                            type__name=type).order_by('create_time')
                    else:
                        rooms = Room.objects.filter(
                            type__name=type).order_by('-create_time')

            else:
                rooms = Room.objects.filter(name__contains=search).all()

            pageInatoredRooms, ret['page_count'] = customizePaginator(
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
                                            "state": room.state,
                                            "take_seat_quorum": room.take_seat_quorum,
                                            "message_count": cache.get('room_message_count_'+str(room.pk), 0),
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
                                            "state": room.state,
                                            "take_seat_quorum": room.take_seat_quorum,
                                            "message_count": cache.get('room_message_count_'+str(room.pk), 0),
                                            "surplus": room.type.max_quorum - room.take_seat_quorum,
                                            "users": [{"user": user.username, "avator_color": user.avator_color} for user in users_in_room],
                                            "favorited": 1 if room.users_favorited.filter(username=payload["username"]).exists() else 0, "stateType": room.type.type})

            ret['data'] = roomAndRoomUser
            return JsonResponse(ret)

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

            # 判断今天是否创建过房间
            allUserRooms = Room.objects.filter(
                creator__username=username).all()

            for i in allUserRooms:
                if i.todayIsCreate:
                    return JsonResponse(RoomResponseCode.todayCreated)

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

            ret = {'code': 200, 'message': '创建房间成功'}
            ret["data"] = {"name": roomFields.name,  "description": roomFields.description,
                           "pk": roomFields.pk,
                           "create_time": roomFields.create_time,
                           "creator": roomFields.creator.username,
                           "uuid": roomFields.uuid,
                           "type": roomFields.type.name,
                           "take_seat_quorum": roomFields.take_seat_quorum,
                           "surplus": roomFields.type.max_quorum - roomFields.take_seat_quorum,
                           "users": [{"user": user.username, "avator_color": user.avator_color}], "stateType": roomFields.type.type}

            return JsonResponse(ret)

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

            users_in_room = room.users.all().order_by('-pk')
            user_join_list = [{"username": user.username,
                               "avator_color": user.avator_color} for user in users_in_room]

            ret = {'code': 200, 'message': '获取成功'}
            ret['data'] = {
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

            return JsonResponse(ret)

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

            sendMessageToChat('room_'+str(roomId),
                              '{}加入车队'.format(username))
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

            sendMessageToChat('room_'+str(roomId),
                              '{}离开座位'.format(username))
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

            ret = {'code': 200, 'message': '获取成功'}
            ret['data'] = user_join_list
            ret['leader'] = room.creator.username
            return JsonResponse(ret)

        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)

    # 车队发车 + 创建房间内成员订单
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
                ret = {'code': 403, 'message': '发车失败'}
                ret['message'] = '发车失败,人数不足'
                return JsonResponse(ret)

            try:
                users_in_room = room.users.all()
                users_email = [user.email for user in users_in_room]
                priceOfItem = room.type.price / room.take_seat_quorum
                currentStampTime = getCurrentTimestamp()

                # 存储进入redis的集合
                ordersInsert = []
                # 临时存储即将入库的订单集合
                cloneInsertFiveFields = []
                # 生成对应人数的记录
                for user in users_in_room:
                    discount = discountPrice(priceOfItem)
                    order_id = generateRandomnumber()
                    ordersInsert.append({"order_id": order_id, "state": 0, "qrcode": "empty",
                                        "room": room.pk, "user": user.username, "discount_price": discount, "create_time": currentStampTime, "price": priceOfItem, "avatorColor": user.avator_color})
                    cloneInsertFiveFields.append({"order_id": order_id, "room": room, "user": user.username, "price": priceOfItem,
                                                 "discount_price": discount, "type": room.type.name, "time": room.type.time, "create_time": currentStampTime})

                # 构建需要请求订单的数据
                ordersSerialize = []
                for i in ordersInsert:
                    ordersSerialize.append({"order_id": i["order_id"], "state": i["state"], "price": i["price"],
                                           "qrcode": i["qrcode"], "user": i["user"], "avatorColor": i["avatorColor"], "create_time": i["create_time"], "discount_price": i['discount_price']})

                requestOrderdata = []
                for i in ordersSerialize:
                    requestOrderdata.append(buildOrderParmas(i, roomId))
                # 并发请求order
                requestUsersOrderQrValue = []
                with ThreadPoolExecutor(max_workers=len(ordersSerialize)) as executor:
                    results = [executor.submit(
                        post_request, PAY_HOST, data) for data in requestOrderdata]
                    # 获取每个任务的结果
                    for future in results:
                        result = future.result()
                        if result == 'full':
                            sendMessageToChat(
                                'room_'+str(roomId), '支付通道繁忙,请稍后再试或联系客服')
                            return JsonResponse({'code': 418, 'message': '支付通道繁忙,支付通道繁忙,请稍后再试或联系客服'})
                        elif result == 'exist':
                            sendMessageToChat('room_'+str(roomId), '订单存在')
                            return JsonResponse({'code': 418, 'message': '订单存在'})
                        elif result == 'error':
                            sendMessageToChat(
                                'room_'+str(roomId), '发车失败,请联系客服')
                            return JsonResponse({'code': 418, 'message': '发车失败,请联系客服'})
                        else:
                            requestUsersOrderQrValue.append(
                                {'pay_no': result['no'], 'user': result['user'], 'qr_value': result['qr'], 'pay_amount': result['pay_amount']})

                # 走到这里代表成功请求订单集合
                # 修改即将存入redis的集合
                for payOrder in requestUsersOrderQrValue:
                    for order in ordersInsert:
                        if payOrder['user'] == order['user'] and (payOrder['pay_amount'] == str(order['discount_price']) or payOrder['pay_amount'] == str(order['discount_price'])+'0'):
                            order['qrcode'] = payOrder['qr_value']
                            break

                # 批量入库
                insertMysqlOrder = []
                for mysqlDate in cloneInsertFiveFields:
                    insertMysqlOrder.append(
                        Order(order_id=mysqlDate["order_id"], room=mysqlDate['room'], user=User.objects.filter(username=mysqlDate['user']).first(), price=mysqlDate["price"], discount_price=mysqlDate['discount_price'], type=mysqlDate["type"], time=mysqlDate['time'], create_time=mysqlDate['create_time']))
                Order.objects.bulk_create(insertMysqlOrder)
                room.state = 1
                room.save()
                cache.set('pay_room_' + str(roomId),
                          json.dumps(ordersInsert), ORDER_LIFEYCLE)

                sendMessageToChat('room_'+str(roomId), '队长'+username+'已发车')
                sendDepartureNotify.delay(
                    'Teamup车队@您加入的'+room.name + room.type.name+'车队已发车', users_email)
            except Exception as e:
                # print(str(e))
                room.state = 0
                room.save()
                return JsonResponse(CommonErrorcode.serverError)

            return JsonResponse(RoomResponseCode.fleetDepartureSuccess)

        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)

    # favorite
    def put(self, request, *args, **kwargs):
        try:
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
        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)

    # 踢人
    def delete(self, request, *args, **kwargs):
        try:
            roomId = json.loads(request.body).get('room_id', None)
            kickUser = json.loads(request.body).get('kick_username', None)

            if kickUser is None or kickUser == '' or roomId is None or roomId == '':
                return JsonResponse(CommonErrorcode.paramsError)

            username = request.payload_data['username']

            roomFields = Room.objects.filter(pk=roomId).first()

            if roomFields.state != 0:
                return JsonResponse({'code': 422, 'message': "已发车无法踢人"})

            if username != roomFields.creator.username:
                return JsonResponse(CommonErrorcode.illegallyError)

            roomFields.take_seat_quorum = roomFields.take_seat_quorum-1
            userFields = User.objects.filter(username=kickUser).first()
            roomFields.users.remove(userFields)
            roomFields.save()
            sendMessageToChat('room_'+str(roomId),
                              '队长将{}从座位上扒拉下来了'.format(kickUser))
            return JsonResponse({'code': 200, 'message': "成功将{}踢下座位".format(kickUser)})
        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)


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

            ret = {'code': 200, 'message': '获取队伍支付状态成功'}
            ret['data'] = json.loads(
                memoryTeamAllPayOrder)
            return JsonResponse(ret)

        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)

    # 使用折扣码
    def post(self, request, *args, **kwargs):
        try:
            orderId = json.loads(request.body).get('orderId', None)
            discountCode = json.loads(request.body).get('discountCode', None)
            roomId = json.loads(request.body).get('roomId', None)

            if discountCode is None or discountCode == '' or len(discountCode) != 6 or orderId is None or orderId == '' or roomId is None:
                return JsonResponse(CommonErrorcode.paramsError)

            username = request.payload_data['username']

            try:
                codeFields = DiscountCode.objects.get(code=str(discountCode))
            except ObjectDoesNotExist:
                return JsonResponse(CodeResonseCode.codeError)

            # 有效期
            if getCurrentTimestamp() < codeFields.begin_time or getCurrentTimestamp() > codeFields.end_time:
                return JsonResponse(CodeResonseCode.codeNotStartOrExpire)

            # 用户已使用
            allUseCodeUser = codeFields.use_user.filter(username=username)
            if len(allUseCodeUser) >= 1:
                return JsonResponse(CodeResonseCode.used)

            # 订单已使用
            allUseCodeOrder = codeFields.use_order.filter(order_id=orderId)
            if len(allUseCodeOrder) >= 1:
                return JsonResponse(CodeResonseCode.orderUsed)

            useOrderFields = Order.objects.get(order_id=orderId)
            if useOrderFields.discount_code != 'random':
                return JsonResponse(CodeResonseCode.orderUsed)

            # 只能用于30天的账号
            if useOrderFields.time != 30:
                return JsonResponse({"code": 489, "message": '该折扣码仅适用于30天的账号'})

            # 计算折扣
            useOrderFields.discount_code = discountCode
            useOrderFields.order_id = generateRandomnumber()
            effect = codeFields.effect.split('|')
            if effect[0] == '-':
                useOrderFields.discount_price = toUseDiscountPrice(
                    useOrderFields.price - int(effect[1]))
            elif effect[0] == '%':
                useOrderFields.discount_price = toUseDiscountPrice(
                    useOrderFields.price / 10 * int(effect[1]))

            memoryPrefix = ''
            if roomId != 'account':
                memoryPrefix = 'pay_room_'+str(roomId)
            else:
                memoryPrefix = 'pay_account_'+orderId
            memoryOrder = cache.get(memoryPrefix, None)
            if memoryOrder is None:
                return JsonResponse(CodeResonseCode.orderNotFound)

            serizeleMemoryOrder = json.loads(memoryOrder)
            requestOrderClone = None
            if roomId != 'account':
                for i in serizeleMemoryOrder:
                    if i['order_id'] == orderId:
                        i['discountPrice'] = useOrderFields.discount_price
                        i['discount_price'] = useOrderFields.discount_price
                        i['create_time'] = getCurrentTimestamp()
                        i['order_id'] = useOrderFields.order_id
                        requestOrderClone = i
                        break
            else:
                serizeleMemoryOrder['discountPrice'] = useOrderFields.discount_price
                serizeleMemoryOrder['order_id'] = useOrderFields.order_id
                serizeleMemoryOrder['create_time'] = getCurrentTimestamp()

            # 请求折扣价格订单
            orderParams = buildOrderParamasOfDiscount(
                requestOrderClone if requestOrderClone is not None else serizeleMemoryOrder, 'room|'+str(roomId) if roomId != 'account' else 'account|'+serizeleMemoryOrder['user'])
            result = post_request(PAY_HOST, orderParams)
            if result == 'full':
                return JsonResponse({'code': 418, 'message': '支付通道繁忙,请稍后再试或联系客服'})
            elif result == 'exist':
                return JsonResponse({'code': 418, 'message': '订单存在'})
            elif result == 'error':
                return JsonResponse({'code': 418, 'message': '刷新失败,请稍后再试'})

            # 入库操作
            if roomId != 'account':
                for i in serizeleMemoryOrder:
                    if i['order_id'] == useOrderFields.order_id:
                        i['qrcode'] = result['qr']
                        break
                cache.set(memoryPrefix, json.dumps(
                    serizeleMemoryOrder), ORDER_LIFEYCLE)
            else:
                serizeleMemoryOrder['qrcode'] = result['qr']
                cache.set('pay_account_'+useOrderFields.order_id,
                          json.dumps(serizeleMemoryOrder), ACCOUNT_ORDER_LIFEYCLE)
                cache.delete(memoryPrefix)
            codeFields.use_user.add(User.objects.get(username=username))
            codeFields.use_order.add(useOrderFields)
            codeFields.save()
            useOrderFields.save()

            ret = {'code': 200, 'message': "使用成功,请在二维码有效期内付款(刷新二维码后无效)"}
            ret['discountPrice'] = useOrderFields.discount_price
            ret['order_id'] = useOrderFields.order_id
            ret['qrcode'] = result['qr']
            return JsonResponse(ret)
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
                    orderFields = Order.objects.filter(
                        order_id=i['order_id']).first()
                    # 生成参数
                    i['discount_price'] = discountPrice(i['price'])
                    i['create_time'] = getCurrentTimestamp()
                    i['order_id'] = generateRandomnumber()
                    requestOrderParmas = buildOrderParmas(i, roomId)

                    # 重新获取qrcode
                    result = post_request(PAY_HOST, requestOrderParmas)
                    if result == 'full':
                        return JsonResponse({'code': 418, 'message': '支付通道繁忙,请稍后再试或联系客服'})
                    elif result == 'exist':
                        return JsonResponse({'code': 418, 'message': '订单存在'})
                    elif result == 'error':
                        return JsonResponse({'code': 418, 'message': '发车失败,请稍后再试'})

                    i['qrcode'] = result['qr']
                    orderFields.order_id = i['order_id']
                    orderFields.discount_price = i['discount_price']
                    orderFields.save()
                    cache.set('pay_room_'+str(roomId),
                              json.dumps(serializeMemoryTeamAllPayOrder), ORDER_LIFEYCLE)

                    ret = {'code': 200, 'message': '二维码刷新成功'}
                    ret['order'] = {"order_id": orderFields.order_id,
                                    "discount_price": orderFields.discount_price, 'qrcode': i['qrcode']}
                    return JsonResponse(ret)

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

            response = JsonResponse(res)
            response['Cache-Control'] = 'max-age=' + \
                str(TYPE_PRICE_CACHETIME)

            return response
        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)
