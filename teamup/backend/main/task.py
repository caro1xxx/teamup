import django
django.setup()
from main.tools import sendMessageToChat, getCurrentTimestamp, fromTsToTime
from django.template.loader import render_to_string
from django.core import serializers
import json
from main import models
from django.core.cache import cache
from backend import settings
from celery import shared_task
from django.core.mail import send_mail
from main.config import USEING_GROUP_MAX_TIME
from main.config import PATH_NAME


@shared_task  # 注册验证码
def send_async_email(subject, message, from_email, recipient_list):
    email_content = render_to_string(
        'RegisterCode.html', {'code': str(message)})
    send_mail(subject, message, 'Teamup Team <' + from_email+'>', [
              recipient_list], html_message=email_content)


@shared_task  # @消息
def send_aite_mail(subject, message, from_email, recipient_list):
    email_content = render_to_string(
        'AiteMessage.html', {'content': message['content'], 'recivceUser': message['recivceUser'], 'sendUser': message['sendUser']})
    send_mail(subject, '', 'Teamup Team <' + from_email+'>', [
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
    send_mail(topic, '', 'Teamup Team <' + settings.EMAIL_HOST_USER+'>',
              userList, html_message=email_content)


@shared_task
def checkAllUserPayed(memoryallUser, roomId, orderId):
    for i in memoryallUser:
        if i["state"] == 0:
            return
    models.Room.objects.filter(pk=roomId).update(state=2)
    sendMessageToChat('room_'+roomId, '全员付款完毕,正在生成账号中请稍等')


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
    currentUseingGroup = ''
    for group in specifyTypeModel:
        if (group.remaining == usersCount):
            currentUseingGroup = 'useing_group'+str(group.pk)
            # 判断当前账号组是否正在生成账号中
            if cache.get(currentUseingGroup, None) is not None:
                continue
            cache.set(currentUseingGroup, 1, USEING_GROUP_MAX_TIME)
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

        # 人数>组账号数对应
        if (len(allUsersUsername) > len(allSameGroupAccounts)):
            sendMessageToChat('room_'+str(roomId), '账号分配数量和当前团队人员数量发生异常,请联系客服')
        else:
            allUsersFields = models.User.objects.filter(
                username__in=allUsersUsername)

            mainNotifys = []

            # 人数 == 组账号数对应
            if (len(allUsersUsername) == len(allSameGroupAccounts)):
                for index, value in enumerate(allSameGroupAccounts):
                    value.distribute_user_id = allUsersFields[index].pk
                    value.user_buy_expire_time = getCurrentTimestamp() + models.Order.objects.filter(
                        order_id=orderId).first().time * 60 * 60 * 24
                    value.save()
                    mainNotifys.append(
                        {"email": allUsersFields[index].email, "account": value.username, "password": value.password, "seat": value.seat_code, "number": value.seat_number})

            # 人数 < 组账号数对应
            else:
                currentUserIdx = 0
                for index, value in enumerate(allSameGroupAccounts):
                    if value.distribute_user_id is not None:
                        continue
                    value.distribute_user_id = allUsersFields[currentUserIdx].pk
                    value.user_buy_expire_time = getCurrentTimestamp() + models.Order.objects.filter(
                        order_id=orderId).first().time * 60 * 60 * 24
                    value.save()
                    mainNotifys.append(
                        {"email": allUsersFields[currentUserIdx].email, "account": value.username, "password": value.password, "seat": value.seat_code, "number": value.seat_number})

                    # 如果当前人数已经分配完毕就退出
                    if currentUserIdx+1 == len(allUsersUsername):
                        break
                    currentUserIdx = currentUserIdx+1

            eqGroup[0].distribute = eqGroup[0].distribute + usersCount
            eqGroup[0].save()

            roomFieldsType.state = 3
            roomFieldsType.save()
            for item in mainNotifys:
                email_content = render_to_string('AccountGenertor.html', {
                                                 'account': item["account"], "password": item["password"], "seat": item["seat"], "number": item["number"], "expire": '将于'+fromTsToTime(getCurrentTimestamp()+roomFieldsType.type.time*60*60*24)+'到期'})
                send_mail(
                    'Teamup@账号生成通知', '', 'Teamup Team <' + settings.EMAIL_HOST_USER+'>', [item["email"]], html_message=email_content)
            sendMessageToChat('room_'+str(roomId), '账号分配成功,请查看站点消息或邮箱')
    else:
        sendMessageToChat('room_'+str(roomId), '账号不足,正在补货中')

    cache.delete(currentUseingGroup)


@shared_task
def generatorAccountOfrPerson(OrderId, username):
    orderFields = models.Order.objects.filter(order_id=OrderId).first()
    specifyTypeModel = models.Group.objects.filter(
        type=orderFields.type).all()

    AccountFields = []

    remainingFlag = 0
    currentUseingGroup = ''
    while len(AccountFields) == 0 and remainingFlag <= 5:
        remainingFlag = remainingFlag+1
        for group in specifyTypeModel:
            if (group.remaining == remainingFlag):
                currentUseingGroup = 'useing_group'+str(group.pk)
                # 判断当前账号组是否正在生成账号中
                if cache.get(currentUseingGroup, None) is not None:
                    continue
                cache.set(currentUseingGroup, 1, USEING_GROUP_MAX_TIME)
                AccountFields.append(group)
                break
    if len(AccountFields) == 1:
        dispatchAccount = models.Account.objects.filter(
            related_group_id=AccountFields[0].pk).all()

        idleAccount = ''
        for account in dispatchAccount:
            if account.distribute_user_id is None:
                idleAccount = account
                break

        # 如果用户没有登录,那么将user表中的guest用户关联到account
        if username == 'unknown':
            idleAccount.distribute_user_id = 1
        else:
            userFiedls = models.User.objects.filter(username=username).first()
            idleAccount.distribute_user_id = userFiedls.pk
        idleAccount.user_buy_expire_time = getCurrentTimestamp() + \
            orderFields.time * 60 * 60 * 24
        idleAccount.save()
        AccountFields[0].distribute = AccountFields[0].distribute + 1
        AccountFields[0].save()

        sendMessageToChat('pay_notify_'+OrderId,
                          json.dumps({"username": idleAccount.username, 'password': idleAccount.password, "seat": idleAccount.seat_code, "number": idleAccount.seat_number}))
    else:
        sendMessageToChat('pay_notify_'+OrderId, '分配失败,无可用账号')
    cache.delete(currentUseingGroup)


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
        send_mail('Teamup车队{}密码修改通知'.format(account['username']), '', 'Teamup Team <' + settings.EMAIL_HOST_USER+'>',
                  [account['email']], html_message=email_content)


@shared_task
def relatedAccounts(accounts, userId):
    for i in accounts:
        orderPayed = models.Order.objects.filter(
            order_id=i['order_id'], state=1, userFlag=i['userFlag']).first()
        if orderPayed is not None:
            models.Account.objects.filter(username=i['username'], password=i['password'],
                                          seat_code=i['seat'], distribute_user_id=1).update(distribute_user_id=userId)


@shared_task
def saveFlow(path, ip):
    models.Flow.objects.create(ip=ip, path=PATH_NAME.get(
        path, '未知'), visit_time=getCurrentTimestamp())
