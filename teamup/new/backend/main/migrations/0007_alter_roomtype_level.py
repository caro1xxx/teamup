# Generated by Django 4.2.4 on 2023-08-21 06:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_remove_message_read'),
    ]

    operations = [
        migrations.AlterField(
            model_name='roomtype',
            name='level',
            field=models.CharField(max_length=128, verbose_name='天数'),
        ),
    ]
