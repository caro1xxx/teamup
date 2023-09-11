from django.urls import re_path, path
from main.views.goods import Goods
from main.views.user import LoginToken, History
from main.views.order import AnOrder, UseDiscount, Pay, PayNotify
from main.views.admin import Login, Stockpiles, PayOrder, Charge
urlpatterns = [
    # re_path('admin/', admin.site.urls),
    re_path(r'^api/v1/teamup/goods/$', Goods.as_view()),
    re_path(r'^api/v1/teamup/login/$', LoginToken.as_view()),
    re_path(r'^api/v1/teamup/order/$', AnOrder.as_view()),
    re_path(r'^api/v1/teamup/discount/$', UseDiscount.as_view()),
    re_path(r'^api/v1/teamup/pay/$', Pay.as_view()),
    re_path(r'^api/v1/teamup/notify/$', PayNotify.as_view()),
    re_path(r'^api/v1/teamup/card/$', History.as_view()),

    # admin
    re_path(r'^api/v1/teamup/admin_login/$', Login.as_view()),
    re_path(r'^api/v1/teamup/stock/$', Stockpiles.as_view()),
    re_path(r'^api/v1/teamup/payorder/$', PayOrder.as_view()),
    re_path(r'^api/v1/teamup/charge/$', Charge.as_view()),
]
