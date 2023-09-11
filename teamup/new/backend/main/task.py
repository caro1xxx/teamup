import django
django.setup()
from main.models import User
from django.template.loader import render_to_string
from backend import settings
from celery import shared_task
from django.core.mail import send_mail


@shared_task  # 发送注册邮件
def sendMail(subject, message, recipient_list):
    email_content = render_to_string(
        'mail.html', {'title': message['title'], "message":  message['message']})
    send_mail(subject, '', 'Teamup Team <' + settings.EMAIL_HOST_USER+'>', [
              recipient_list], html_message=email_content)


@shared_task  # 发送订单邮件
def sendOrderMail(subject, message, recipient_list):
    email_content = render_to_string(
        'orderMail.html', {'title': message['title'], "username":  message['username'], "password":  message['password'], "seat_number":  message['seat_number'], "seat_pin":  message['seat_pin'], "expire_time":  message['expire_time']})
    send_mail(subject, '', 'Teamup Team <' + settings.EMAIL_HOST_USER+'>', [
              recipient_list], html_message=email_content)


@shared_task  # 发送消息给管理员
def sendMessageToAdmin(subject, message):
    allAdmin = User.objects.filter(level=1).all()
    allAdminEmail = []
    for admin in allAdmin:
        allAdminEmail.append(admin.email)

    email_content = render_to_string(
        'mail.html', {'title': message['title'], "message":  message['message']})
    send_mail(subject, '', 'Teamup Team <' +
              settings.EMAIL_HOST_USER+'>', allAdminEmail, html_message=email_content)
