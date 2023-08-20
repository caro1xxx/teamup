from django.db import models
from main.tools import getCurrentTimestamp
# daphne backend.asgi:application -b 0.0.0.0 -p 8000
# python3 -m celery -A backend worker -l info


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
    name = models.CharField(max_length=32)
    level = models.CharField(max_length=128, verbose_name='天数', unique=True)
    price = models.FloatField(verbose_name="总价")
    type = models.IntegerField(verbose_name='平台账号或者自备账号')
    max_quorum = models.IntegerField()

    def natural_key(self):
        return {'typename': self.name}


class Room(models.Model):
    name = models.CharField(max_length=20)
    description = models.CharField(max_length=128)
    create_time = models.IntegerField()
    uuid = models.CharField(max_length=6)
    state = models.IntegerField(verbose_name='发车状态')
    creator = models.ForeignKey(
        User, to_field='username', on_delete=models.CASCADE, related_name='created_user')
    type = models.ForeignKey(
        RoomType, on_delete=models.CASCADE, related_name='rooms_of_type')
    take_seat_quorum = models.PositiveIntegerField(
        default=0, verbose_name="记录当前车队人数")
    users = models.ManyToManyField(
        User, related_name='rooms_joined', verbose_name="记录当前车队包含的用户")
    users_favorited = models.ManyToManyField(
        User, related_name='favorite_rooms', blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.take_seat_quorum > self.type.max_quorum:
            raise ValueError("当前车队已满员")
        super().save(*args, **kwargs)


class Order(models.Model):
    order_id = models.CharField(max_length=32)
    state = models.IntegerField(verbose_name='0未支付,1支付成功,2二维码到期', default=0)
    price = models.FloatField()
    qrcode = models.CharField(max_length=128)
    room = models.ForeignKey(
        Room, on_delete=models.SET_NULL, null=True, related_name='orders')
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name='users')
    create_time = models.IntegerField()
    qr_expire_time = models.IntegerField()


class Group(models.Model):
    type = models.CharField(max_length=32)
    sum = models.IntegerField(default=0)
    distribute = models.IntegerField(default=0)

    # 获取当前组剩余未使用的账号数
    @property
    def remaining(self):
        return self.sum - self.distribute


class Account(models.Model):
    username = models.CharField(max_length=32)
    password = models.CharField(max_length=10)
    email = models.CharField(max_length=64, unique=True)
    create_time = models.IntegerField()
    expire_time = models.IntegerField()
    distribute_user = models.OneToOneField(
        User, null=True, blank=True, on_delete=models.SET_NULL, related_name='distributeUser'
    )

    related_group = models.ForeignKey(
        Group, null=True, blank=True, on_delete=models.SET_NULL, related_name='group'
    )

    # 获取当前账号是否被分配
    @property
    def isDistribute(self):
        return self.distribute_user is not None

    # 获取当前账号的组pk
    @property
    def getGroupPk(self):
        return self.related_group.pk

    def save(self, *args, **kwargs):
        if not self.id:  # 如果是新创建的记录
            self.create_time = getCurrentTimestamp()
        super(Account, self).save(*args, **kwargs)
