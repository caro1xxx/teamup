from django.urls import re_path, path
from main.views.login import Login
from main.views.shop import GoodsPrice

urlpatterns = [
    # re_path('admin/', admin.site.urls),
    re_path(r'^api/v1/teamup/login/$', Login.as_view()),
    re_path(r'^api/v1/teamup/goods/$', GoodsPrice.as_view()),
]
