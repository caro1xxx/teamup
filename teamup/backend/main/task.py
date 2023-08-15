import django
django.setup()
from main import models
from backend import settings
from celery import shared_task
from django.core.mail import send_mail


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
