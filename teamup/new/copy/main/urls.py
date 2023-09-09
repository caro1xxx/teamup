from django.urls import re_path, path
from main.views.login import Login
from main.views.shop import GoodsPrice
from main.views.order import AnOrder, UseDiscount
from main.views.user import BandMail, OrderHistory

urlpatterns = [
    # re_path('admin/', admin.site.urls),
    re_path(r'^api/v1/teamup/login/$', Login.as_view()),
    re_path(r'^api/v1/teamup/goods/$', GoodsPrice.as_view()),
    re_path(r'^api/v1/teamup/order/$', AnOrder.as_view()),
    re_path(r'^api/v1/teamup/discount/$', UseDiscount.as_view()),
    re_path(r'^api/v1/teamup/band/$', BandMail.as_view()),
    re_path(r'^api/v1/teamup/card/$', OrderHistory.as_view()),
]
