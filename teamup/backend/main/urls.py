from django.contrib import admin
from django.urls import re_path
from main.views.user import loginAndRegister, property
from main.views.room import handleRoom
from main.views.pay import dealings

urlpatterns = [
    # re_path('admin/', admin.site.urls),
    re_path(r'^api/v1/teamup/register/$', loginAndRegister.register.as_view()),
    re_path(r'^api/v1/teamup/sendcode/$',
            loginAndRegister.sendEmailCode.as_view()),
    re_path(r'^api/v1/teamup/login/$', loginAndRegister.login.as_view()),
    re_path(r'^api/v1/teamup/room/$', handleRoom.Rooms.as_view()),
    re_path(r'^api/v1/teamup/team/$', handleRoom.Team.as_view()),
    re_path(r'^api/v1/teamup/handler/$', handleRoom.Handler.as_view()),
    re_path(r'^api/v1/teamup/paystate/$', handleRoom.PayState.as_view()),
    re_path(r'^api/v1/teamup/typeprice/$', handleRoom.TypeInfo.as_view()),
    re_path(r'^api/v1/teamup/notify/$', property.Notify.as_view()),
    re_path(r'^api/v1/teamup/favorites/$', property.Favorite.as_view()),
    re_path(r'^api/v1/teamup/usermail/$', property.Mail.as_view()),


    # pay
    re_path(r'^api/v1/teamup/paynotify/$', dealings.Pay.as_view()),
]
