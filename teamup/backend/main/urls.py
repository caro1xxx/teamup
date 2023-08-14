from django.contrib import admin
from django.urls import path, re_path
from main.views.user import loginAndRegister
from main.views.room import handleRoom
from main.views.chat import chat

urlpatterns = [
    # re_path('admin/', admin.site.urls),
    path('api/v1/teamup/register/', loginAndRegister.register.as_view()),
    re_path(r'^api/v1/teamup/sendcode/$',
            loginAndRegister.sendEmailCode.as_view()),
    re_path(r'^api/v1/teamup/login/$', loginAndRegister.login.as_view()),
    re_path(r'^api/v1/teamup/room/$', handleRoom.room.as_view()),
    re_path(r'^api/v1/teamup/team/$', handleRoom.Team.as_view()),
    re_path(r'^api/v1/teamup/handler/$', handleRoom.Handler.as_view()),
    re_path(r'^api/v1/teamup/chat/connect/$', chat.ChatSSE.connect),
]
