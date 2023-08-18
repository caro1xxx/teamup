# Generated by Django 4.2.4 on 2023-08-17 16:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=32)),
                ('sum', models.IntegerField(default=0)),
                ('distribute', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=32)),
                ('password', models.CharField(max_length=10)),
                ('email', models.CharField(max_length=64, unique=True)),
                ('create_time', models.IntegerField()),
                ('expire_time', models.IntegerField()),
                ('distribute_user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='distributeUser', to='main.user')),
                ('related_group', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='group', to='main.group')),
            ],
        ),
    ]