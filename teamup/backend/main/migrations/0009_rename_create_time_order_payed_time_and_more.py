# Generated by Django 4.2.4 on 2023-08-22 07:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_usermail'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='create_time',
            new_name='payed_time',
        ),
        migrations.RemoveField(
            model_name='order',
            name='qr_expire_time',
        ),
        migrations.RemoveField(
            model_name='order',
            name='qrcode',
        ),
        migrations.RemoveField(
            model_name='order',
            name='state',
        ),
        migrations.AddField(
            model_name='order',
            name='payed_qrcode',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='order',
            name='room',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='orders', to='main.room'),
        ),
        migrations.AlterField(
            model_name='order',
            name='user',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='users', to='main.user'),
        ),
    ]