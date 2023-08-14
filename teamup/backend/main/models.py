from django.db import models


class User(models.Model):
    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=32)
    create_time = models.IntegerField()
    avator_color = models.CharField(max_length=7)
    email = models.CharField(max_length=50, unique=True)
    premium = models.IntegerField(default=0)
    admin = models.IntegerField(default=0)

    def natural_key(self):
        return {'username': self.username}


class RoomType(models.Model):
    name = models.CharField(max_length=32, unique=True)
    max_quorum = models.IntegerField()

    def natural_key(self):
        return {'typename': self.name}


class Room(models.Model):
    name = models.CharField(max_length=20)
    description = models.CharField(max_length=128)
    create_time = models.IntegerField()
    uuid = models.CharField(max_length=6)
    creator = models.ForeignKey(
        User, to_field='username', on_delete=models.CASCADE, related_name='created_user')
    type = models.ForeignKey(
        RoomType, on_delete=models.CASCADE, related_name='rooms_of_type')
    take_seat_quorum = models.PositiveIntegerField(
        default=0, verbose_name="记录当前车队人数")
    users = models.ManyToManyField(
        User, related_name='rooms_joined', verbose_name="记录当前车队包含的用户")

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.take_seat_quorum > self.type.max_quorum:
            raise ValueError("当前车队已满员")
        super().save(*args, **kwargs)
