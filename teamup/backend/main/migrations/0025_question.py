# Generated by Django 4.2.4 on 2023-08-25 14:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0024_discountcode_begin_time_discountcode_effect_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=32, unique=True)),
                ('email', models.CharField(max_length=128, unique=True)),
                ('use_type', models.CharField(max_length=32)),
                ('question', models.TextField()),
                ('suggestion', models.TextField()),
                ('score', models.IntegerField()),
            ],
        ),
    ]
