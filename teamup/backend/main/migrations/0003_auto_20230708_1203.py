# Generated by Django 3.2.8 on 2023-07-08 04:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_auto_20230708_1159'),
    ]

    operations = [
        migrations.AlterField(
            model_name='guest',
            name='browser',
            field=models.CharField(default='empty', max_length=64, verbose_name='浏览器'),
        ),
        migrations.AlterField(
            model_name='guest',
            name='system',
            field=models.CharField(default='empty', max_length=64, verbose_name='系统'),
        ),
    ]