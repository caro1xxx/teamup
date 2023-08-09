from django.db import models

class User(models.Model):
  username = models.CharField(max_length=20, unique=True)
  password = models.CharField(max_length=32)
  create_time = models.IntegerField()
  email = models.CharField(max_length=50, unique=True)
  premium = models.IntegerField(default=0)
  admin = models.IntegerField(default=0)