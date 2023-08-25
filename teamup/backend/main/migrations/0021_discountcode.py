# Generated by Django 4.2.4 on 2023-08-25 03:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0020_alter_account_user_buy_expire_time'),
    ]

    operations = [
        migrations.CreateModel(
            name='DiscountCode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=6, unique=True)),
                ('use_order', models.ManyToManyField(blank=True, related_name='order', to='main.order', verbose_name='使用折扣码的订单')),
                ('use_user', models.ManyToManyField(blank=True, related_name='user', to='main.user', verbose_name='使用折扣码的用户')),
            ],
        ),
    ]
