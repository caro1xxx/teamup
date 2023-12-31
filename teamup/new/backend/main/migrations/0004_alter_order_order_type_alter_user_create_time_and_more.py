# Generated by Django 4.2.4 on 2023-09-10 16:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_type_favorable_alter_user_create_time_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='order_type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='type_info', to='main.type'),
        ),
        migrations.AlterField(
            model_name='user',
            name='create_time',
            field=models.IntegerField(default=1694363504),
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.CharField(default='69lxevt@teamup.best', max_length=128, unique=True),
        ),
    ]
