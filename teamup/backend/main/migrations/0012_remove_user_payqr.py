# Generated by Django 4.2.4 on 2023-08-15 17:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_user_payqr'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='payqr',
        ),
    ]
