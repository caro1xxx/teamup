from django.db import models

class User(models.Model):
  username = models.CharField(max_length=16, unique=True, db_index=True, verbose_name='用户名')
  password = models.CharField(max_length=32, verbose_name='密码')
  permission_choices = (
    (0, "guest"),
    (1, "member"),
    (2, "permission"),
    (3, "admin"),
  )
  permission = models.SmallIntegerField(choices=permission_choices, verbose_name='权限')
  create_time =  models.IntegerField(default=0, verbose_name='创建时间')
  balance =  models.FloatField(default=0.00, verbose_name='余额')
  status_choices = (
    (0, "ban"),
    (1, "suspense"),
    (2, "normal"),
  )
  status = models.SmallIntegerField(choices=status_choices, verbose_name='状态')
  ip_address = models.GenericIPAddressField(protocol='IPv4')
  avator = models.FileField(upload_to='avator/', max_length=100, verbose_name='头像')
  email = models.EmailField()
  marker_key = models.CharField(max_length=64, verbose_name='用户标记')

class Guest(models.Model):
  username = models.CharField(max_length=16, unique=True, db_index=True, verbose_name='用户名')
  marker_key = models.CharField(max_length=32, verbose_name='用户标记')
  browser = models.CharField(max_length=128, default='empty', verbose_name='浏览器')
  system = models.CharField(max_length=128, default='empty',  verbose_name='系统')
  ip_address = models.GenericIPAddressField(protocol='IPv4')