# Generated by Django 4.2.4 on 2023-08-22 09:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0014_order_discount_price_alter_order_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='userFlag',
            field=models.CharField(default='', max_length=5, verbose_name='在用户未登录的情况下创建订单的标示'),
        ),
    ]