from django.urls import re_path, path
from main.views.goods import Goods
from main.views.user import LoginToken
from main.views.order import AnOrder, UseDiscount, Pay

urlpatterns = [
    # re_path('admin/', admin.site.urls),
    re_path(r'^api/v1/teamup/goods/$', Goods.as_view()),
    re_path(r'^api/v1/teamup/login/$', LoginToken.as_view()),
    re_path(r'^api/v1/teamup/order/$', AnOrder.as_view()),
    re_path(r'^api/v1/teamup/discount/$', UseDiscount.as_view()),
    re_path(r'^api/v1/teamup/pay/$', Pay.as_view()),
]
