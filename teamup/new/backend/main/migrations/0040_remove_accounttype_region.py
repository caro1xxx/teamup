# Generated by Django 4.2.4 on 2023-09-02 08:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0039_accounttype_region'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='accounttype',
            name='region',
        ),
    ]
