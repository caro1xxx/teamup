import django
django.setup()
from main.tools import sendMessageToChat, getCurrentTimestamp, fromTsToTime
from django.template.loader import render_to_string
from django.core import serializers
import json
from main import models
from backend import settings
from celery import shared_task
from django.core.mail import send_mail


@shared_task  # 注册验证码
def send_async_email(subject, message, from_email, recipient_list):
    email_content = render_to_string(
        'RegisterCode.html', {'code': str(message)})
    send_mail(subject, message, from_email, [
              recipient_list], html_message=email_content)


@shared_task  # @消息
def send_aite_mail(subject, message, from_email, recipient_list):
    email_content = render_to_string(
        'AiteMessage.html', {'content': message['content'], 'recivceUser': message['recivceUser'], 'sendUser': message['sendUser']})
    send_mail(subject, '', from_email, [
              recipient_list], html_message=email_content)


@shared_task
def sendChatNotifyMessage(topic, message):
    UserFields = models.User.objects.filter(
        username=message['recivceUser']).first()
    send_aite_mail(
        topic, message, settings.EMAIL_HOST_USER, UserFields.email)


@shared_task
def sendDepartureNotify(topic, userList):
    email_content = render_to_string('Departure.html')
    send_mail(topic, '', settings.EMAIL_HOST_USER,
              userList, html_message=email_content)


@shared_task
def checkAllUserPayed(memoryallUser, roomId, orderId):
    for i in memoryallUser:
        if i["state"] == 0:
            return
    models.Room.objects.filter(pk=roomId).update(state=2)
    sendMessageToChat('room_'+roomId, '全员付款完毕')
    generatorAccount(roomId, memoryallUser, orderId)


@shared_task
def generatorAccount(roomId, users, orderId):
    usersCount = len(users)
    if usersCount == 0:
        return

    roomFieldsType = models.Room.objects.filter(pk=roomId).first()

    # 判断是否是自备邮箱类型
    if roomFieldsType.type.type == 2:
        sendMessageToChat('room_'+str(roomId),
                          '系统正在充值到指定邮箱中,请耐心等待(2小时内到账)')

        allUsersName = [user['user'] for user in users]
        allUsersFields = models.User.objects.filter(
            username__in=allUsersName).all()
        allUsersId = [user.pk for user in allUsersFields]
        models.NeedChargeRoomAccounts.objects.create(
            room_id=roomId, all_user_mail_info=json.dumps(allUsersId))
        return

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
                value.user_buy_expire_time = getCurrentTimestamp() + models.Order.objects.filter(
                    order_id=orderId).first().time * 60 * 60 * 24
                value.save()
                mainNotifys.append(
                    {"email": allUsersFields[index].email, "account": value.username, "password": value.password, "seat": value.seat_code})

            eqGroup[0].distribute = eqGroup[0].distribute + usersCount
            eqGroup[0].save()

            roomFieldsType.state = 3
            roomFieldsType.save()

            for item in mainNotifys:
                email_content = render_to_string('AccountGenertor.html', {
                                                 'account': item["account"], "password": item["password"], "seat": item["seat"], "expire": '将于'+fromTsToTime(getCurrentTimestamp()+roomFieldsType.type.time*60*60*24)+'到期'})
                send_mail(
                    'Teamup@账号生成通知', '', settings.EMAIL_HOST_USER, [item["email"]], html_message=email_content)

            sendMessageToChat('room_'+str(roomId), '账号分配成功,请查看站点消息或邮箱')
    else:
        sendMessageToChat('room_'+str(roomId), '账号不足,正在补货中')


@shared_task
def generatorAccountOfrPerson(OrderId, username):
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
        if username == 'unknown':
            dispatchAccount.distribute_user_id = 1
        else:
            userFiedls = models.User.objects.filter(username=username).first()
            dispatchAccount.distribute_user_id = userFiedls.pk
        dispatchAccount.user_buy_expire_time = getCurrentTimestamp() + \
            orderFields.time * 60 * 60 * 24
        dispatchAccount.save()

        AccountFields[0].distribute = AccountFields[0].distribute + 1
        AccountFields[0].save()

        sendMessageToChat('pay_notify_'+OrderId,
                          json.dumps({"username": dispatchAccount.username, 'password': dispatchAccount.password, "seat": dispatchAccount.seat_code}))
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


@shared_task
def batchChangePasswordMail(accountFields):
    for account in accountFields:
        email_content = render_to_string('ChangeAccountPassword.html', {
                                         'password': account['password']})
        send_mail('Teamup车队{}密码修改通知'.format(account['username']), '', settings.EMAIL_HOST_USER,
                  [account['email']], html_message=email_content)
