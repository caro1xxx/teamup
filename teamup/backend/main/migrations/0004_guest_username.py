# Generated by Django 3.2.8 on 2023-07-08 04:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_auto_20230708_1203'),
    ]

    operations = [
        migrations.AddField(
            model_name='guest',
            name='username',
            field=models.CharField(db_index=True, default=1, max_length=16, unique=True, verbose_name='用户名'),
            preserve_default=False,
        ),
    ]
