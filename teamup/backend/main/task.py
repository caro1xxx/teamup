import django
django.setup()
from django.core.mail import send_mail
from celery import shared_task
from backend import settings
from main import models
from main.tools import sendMessageToChat, getCurrentTimestamp
import json
from django.core import serializers


@shared_task
def send_async_email(subject, message, from_email, recipient_list):
    send_mail(subject, message, from_email, [recipient_list])


@shared_task
def sendChatNotifyMessage(topic, message, who):

    UserFields = models.User.objects.filter(username=who).first()

    send_async_email(
        topic, message, settings.EMAIL_HOST_USER, UserFields.email)


@shared_task
def sendDepartureNotify(topic, userList):
    send_mail(topic, '队长已发车,请尽快支付', settings.EMAIL_HOST_USER, userList)


@shared_task
def checkAllUserPayed(memoryallUser, roomId):
    for i in memoryallUser:
        if i["state"] == 0:
            return
    models.Room.objects.filter(pk=roomId).update(state=2)
    sendMessageToChat('room_'+roomId, '全员付款完毕')
    generatorAccount(roomId, memoryallUser)


@shared_task
def generatorAccount(roomId, users):
    usersCount = len(users)
    if usersCount == 0:
        return

    roomFieldsType = models.Room.objects.filter(pk=roomId).first()
    specifyTypeModel = models.Group.objects.filter(
        type=roomFieldsType.type.name).all()

    eqGroup = []
    for group in specifyTypeModel:
        if (group.remaining == usersCount):
            eqGroup.append(group)
            break

    if len(eqGroup) == 0:
        for group in specifyTypeModel:
            if (group.remaining > usersCount):
                eqGroup.append(group)
                break

    if len(eqGroup) != 0:
        allSameGroupAccounts = models.Account.objects.filter(
            related_group_id=eqGroup[0].pk).all()

        allUsersUsername = [item['user'] for item in users]

        if (len(allUsersUsername) != len(allSameGroupAccounts)):
            sendMessageToChat('room_'+str(roomId), '账号分配数量和当前团队人员数量发生异常')
        else:
            allUsersFields = models.User.objects.filter(
                username__in=allUsersUsername)

            mainNotifys = []

            for index, value in enumerate(allSameGroupAccounts):
                value.distribute_user_id = allUsersFields[index].pk
                value.save()
                mainNotifys.append(
                    {"email": allUsersFields[index].email, "account": value.username, "password": value.password})

            eqGroup[0].distribute = eqGroup[0].distribute + usersCount
            eqGroup[0].save()

            roomFieldsType.state = 3
            roomFieldsType.save()

            for item in mainNotifys:
                send_mail(
                    'Teamup@账号生成通知', item["account"], settings.EMAIL_HOST_USER, [item["email"]])

            sendMessageToChat('room_'+str(roomId), '账号分配成功,请查看站点消息或邮箱')
    else:
        sendMessageToChat('room_'+str(roomId), '账号不足')


@shared_task
def generatorAccountOfrPerson(OrderId):
    orderFields = models.Order.objects.filter(order_id=OrderId).first()
    specifyTypeModel = models.Group.objects.filter(
        type=orderFields.type).all()

    AccountFields = []
    for group in specifyTypeModel:
        if (group.remaining == 1):
            AccountFields.append(group)
            break

    if len(AccountFields) == 0:
        for group in specifyTypeModel:
            if (group.remaining == 2):
                AccountFields.append(group)
                break

    if len(AccountFields) == 0:
        for group in specifyTypeModel:
            if (group.remaining == 3):
                AccountFields.append(group)
                break

    if len(AccountFields) == 0:
        for group in specifyTypeModel:
            if (group.remaining == 4):
                AccountFields.append(group)
                break

    if len(AccountFields) == 0:
        for group in specifyTypeModel:
            if (group.remaining == 5):
                AccountFields.append(group)
                break

    if len(AccountFields) == 1:
        dispatchAccount = models.Account.objects.filter(
            related_group_id=AccountFields[0].pk).first()

        # 如果用户没有登录,那么将user表中的guest用户关联到account
        dispatchAccount.distribute_user_id = 1
        dispatchAccount.save()

        AccountFields[0].distribute = AccountFields[0].distribute + 1
        AccountFields[0].save()

        sendMessageToChat('pay_notify_'+OrderId,
                          json.dumps({"username": dispatchAccount.username, 'password': dispatchAccount.password}))
    else:
        sendMessageToChat('pay_notify_'+OrderId, '分配失败,无可用账号')


@shared_task
def forwardingRoomMessage(content, roomPk, receive_username, send_username):

    from_room = models.Room.objects.get(pk=roomPk)
    receive_user = models.User.objects.get(username=receive_username)
    send_user = models.User.objects.get(username=send_username)

    messageFields = models.Message.objects.create(
        content=content, create_time=getCurrentTimestamp())
    messageFields.from_room.add(from_room)
    messageFields.receive_user.add(receive_user)
    messageFields.send_user.add(send_user)
    messageFields.save()
