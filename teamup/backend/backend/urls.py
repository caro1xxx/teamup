from django.contrib import admin
from django.conf.urls import url
from django.urls import re_path, path


from main.views.User import Login, Register, ImpliedRegister

urlpatterns = [
    url(r'^api/login/$', Login.as_view()),
    url(r'^api/register/$', Register.as_view()),
    url(r'^api/impliedRegister/$', ImpliedRegister.as_view()),
]