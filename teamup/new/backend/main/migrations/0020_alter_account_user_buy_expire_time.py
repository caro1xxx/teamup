# Generated by Django 4.2.4 on 2023-08-25 01:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0019_account_user_buy_expire_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='user_buy_expire_time',
            field=models.IntegerField(default=0, verbose_name='用户购买的到期时间'),
        ),
    ]
