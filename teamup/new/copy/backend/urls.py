from django.contrib import admin
from django.urls import path,include
from main import views


urlpatterns = [
    # re_path('admin/', admin.site.urls),
    path('', include('main.urls')),
    # path('api/v1/teamup/register/', views.register.as_view()),
    # re_path(r'^api/v1/teamup/sendcode/$', views.sendEmailCode.as_view()),
    # re_path(r'^api/v1/teamup/login/$', views.Login.as_view()),

    # path('api/goodreview/', include('goodreview.urls')),
    # path('api/complaint/', include('complaint.urls')),
    
]
