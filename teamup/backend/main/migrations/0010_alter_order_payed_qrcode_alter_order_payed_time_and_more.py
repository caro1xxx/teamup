# Generated by Django 4.2.4 on 2023-08-22 07:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_rename_create_time_order_payed_time_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='payed_qrcode',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='order',
            name='payed_time',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='order',
            name='price',
            field=models.FloatField(default=0.0),
        ),
    ]