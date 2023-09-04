from django.db import models
from main.tools import getCurrentTimestamp
import datetime
# daphne backend.asgi:application -b 0.0.0.0 -p 8000
# python3 -m celery -A backend worker -l info


class User(models.Model):
    username = models.CharField(max_length=20, unique=True, db_index=True)
    password = models.CharField(max_length=32)
    create_time = models.IntegerField()
    avator_color = models.CharField(max_length=7)
    email = models.CharField(max_length=50, unique=True)
    premium = models.IntegerField(default=0)
    admin = models.IntegerField(default=0)

    def natural_key(self):
        return {'username': self.username}


# 房间类型 + 房间账号类型
class RoomType(models.Model):
    name = models.CharField(max_length=32)
    level = models.CharField(max_length=128, verbose_name='天数')
    price = models.FloatField(verbose_name="总价")
    type = models.IntegerField(verbose_name='平台账号或者自备账号')
    max_quorum = models.IntegerField()
    time = models.IntegerField()

    def natural_key(self):
        return {'typename': self.name}


# 账号类型
class AccountType(models.Model):
    type = models.CharField(max_length=32)
    time = models.IntegerField()
    price = models.FloatField(verbose_name='单价')


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

    @property
    def todayIsCreate(self):
        # 获取当前日期
        today = datetime.date.today()
        # 获取今天凌晨的时间
        today_start = datetime.datetime.combine(today, datetime.time.min)
        # 获取明天凌晨的时间
        tomorrow_start = today_start + datetime.timedelta(days=1)
        today_timestamp = int(today_start.timestamp())
        # 将明天凌晨的时间转换为时间戳
        tomorrow_timestamp = int(tomorrow_start.timestamp())
        return self.create_time >= today_timestamp and self.create_time <= tomorrow_timestamp


class Order(models.Model):
    order_id = models.CharField(max_length=32, db_index=True)
    price = models.FloatField()
    discount_price = models.FloatField()
    payed_qrcode = models.TextField(default='')
    state = models.IntegerField(default=0)
    type = models.CharField(max_length=32)
    time = models.IntegerField()
    room = models.ForeignKey(
        Room, on_delete=models.SET_NULL, null=True, related_name='orders', default=None)
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name='users', default=None)
    userFlag = models.CharField(
        max_length=5, verbose_name="在用户未登录的情况下创建订单的标示", default='')
    payed_time = models.IntegerField(default=0)
    discount_code = models.CharField(max_length=6, default='random')
    create_time = models.IntegerField()


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
    password = models.CharField(max_length=16)
    email = models.CharField(max_length=64)
    create_time = models.IntegerField()
    expire_time = models.IntegerField()
    user_buy_expire_time = models.IntegerField(
        default=0, verbose_name='用户购买的到期时间')
    distribute_user = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.SET_NULL, related_name='distributeUser'
    )

    related_group = models.ForeignKey(
        Group, null=True, blank=True, on_delete=models.SET_NULL, related_name='group'
    )
    seat_code = models.IntegerField()
    seat_number = models.IntegerField()

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


class Message(models.Model):
    send_user = models.ManyToManyField(
        User, related_name='send')
    from_room = models.ManyToManyField(
        Room, related_name='from_who_room')
    receive_user = models.ManyToManyField(
        User, related_name='receive')
    content = models.TextField()
    create_time = models.IntegerField()


class UserMail(models.Model):
    email = models.CharField(max_length=128, unique=True)
    password = models.CharField(max_length=32)
    user = models.ForeignKey(
        User, to_field='username', null=True, on_delete=models.SET_NULL, related_name='mail_user')


class Activity(models.Model):
    begin_time = models.IntegerField()
    end_time = models.IntegerField()
    image = models.CharField(max_length=128, verbose_name='图片保存路径')

    # 活动是否结束
    @property
    def efficient(self):
        return self.end_time > getCurrentTimestamp()


class DiscountCode(models.Model):
    code = models.CharField(max_length=6, unique=True, db_index=True)
    use_user = models.ManyToManyField(
        User, related_name='user', verbose_name="使用折扣码的用户", blank=True)
    use_order = models.ManyToManyField(
        Order, related_name='order', verbose_name="使用折扣码的订单", blank=True)
    effect = models.CharField(max_length=32)
    begin_time = models.IntegerField()
    end_time = models.IntegerField()


class Question(models.Model):
    username = models.CharField(max_length=32, unique=True)
    email = models.CharField(max_length=128, unique=True)
    use_type = models.CharField(max_length=32)
    question = models.TextField()
    suggestion = models.TextField()
    score = models.IntegerField()


class NeedChargeRoomAccounts(models.Model):
    room_id = models.IntegerField(unique=True, db_index=True)
    all_user_mail_info = models.CharField(
        max_length=64, verbose_name='记录关联的房间中的所有用户的mail_user表中的id, =>[5,1,3,2,6]')


class NeedChangePaaaword(models.Model):
    group = models.ForeignKey(
        Group, to_field='id', null=True, on_delete=models.SET_NULL, related_name='gourp_id')
    submit_time = models.IntegerField()
    state = models.IntegerField(verbose_name='0未处理,1已处理')


class Flow(models.Model):
    ip = models.CharField(max_length=32)
    path = models.CharField(max_length=32)
    visit_time = models.IntegerField()
