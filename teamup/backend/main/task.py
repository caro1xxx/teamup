import django
django.setup()

from main.tools import sendMessageToChat
from django.core.mail import send_mail
from celery import shared_task
from backend import settings
from main import models


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
    sendMessageToChat('room_'+str(roomId), '全员付款完毕')
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

            for item in mainNotifys:
                send_mail(
                    'Teamup@账号生成通知', item["account"], settings.EMAIL_HOST_USER, [item["email"]])

            sendMessageToChat('room_'+str(roomId), '账号分配成功,请查看站点消息或邮箱')
    else:
        sendMessageToChat('room_'+str(roomId), '账号不足')
