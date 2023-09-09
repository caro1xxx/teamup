from django.urls import re_path, path
from main.views.goods import Goods

urlpatterns = [
    # re_path('admin/', admin.site.urls),
    re_path(r'^api/v1/teamup/goods/$', Goods.as_view()),
]
