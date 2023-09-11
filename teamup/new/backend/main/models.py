from django.db import models
from main.tools import randomString, getCurrentTimestamp


class User(models.Model):
    username = models.CharField(max_length=16, unique=True, db_index=True)
    password = models.CharField(max_length=32, default='empty')
    level = models.IntegerField()
    email = models.CharField(max_length=128, unique=True,
                             default=randomString(7)+'@teamup.best')
    create_time = models.IntegerField(default=getCurrentTimestamp())

    def __str__(self):
        return self.username


class Goods(models.Model):
    name = models.CharField(max_length=64, unique=True, db_index=True)

    def __str__(self):
        return self.name


class Type(models.Model):
    name = models.CharField(max_length=128, unique=True, db_index=True)
    price = models.CharField(max_length=32)
    time = models.IntegerField()
    support = models.TextField()
    region = models.CharField(max_length=32)
    state = models.BooleanField(default=True)
    sale = models.IntegerField(default=0)
    stock = models.IntegerField(default=0)
    favorable = models.CharField(max_length=32, default='empty')
    goods_type = models.ForeignKey(
        Goods, on_delete=models.SET_NULL, null=True, default=None, related_name="goods_type_name")

    def __str__(self):
        return self.name


class Order(models.Model):
    no = models.CharField(max_length=32, unique=True, db_index=True)
    trade_name = models.CharField(max_length=32, verbose_name='订单介绍')
    pay_type = models.CharField(max_length=16, default='wechat')
    order_amount = models.CharField(max_length=16, verbose_name='实际支付金额')
    order_uid = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="create_user")
    order_type = models.ForeignKey(
        Type, on_delete=models.SET_NULL, null=True, related_name="type_info")
    discount_code = models.CharField(max_length=6, default='empty')
    state = models.BooleanField(default=False, verbose_name="支付状态")
    create_time = models.IntegerField()
    qrcode = models.TextField(default='empty')
    qrcode_expire_time = models.IntegerField(default=0)

    def __str__(self):
        return self.no


class Account(models.Model):
    username = models.CharField(max_length=128, unique=True, db_index=True)
    password = models.CharField(max_length=32)
    seat_number = models.IntegerField()
    seat_pin = models.IntegerField()
    register_mail = models.CharField(max_length=64, unique=True)
    expire_time = models.IntegerField()
    dispatch_user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, default=None, related_name="dispatch")
    order = models.ForeignKey(
        Order, on_delete=models.SET_NULL, null=True, default=None, related_name="pay_order")
    user_buy_expire_time = models.IntegerField()
    state = models.BooleanField(default=True)
    region = models.CharField(max_length=64)
    type = models.ForeignKey(Goods, on_delete=models.CASCADE)
