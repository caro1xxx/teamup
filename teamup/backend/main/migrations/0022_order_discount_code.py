# Generated by Django 4.2.4 on 2023-08-25 03:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0021_discountcode'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='discount_code',
            field=models.CharField(default='None', max_length=6),
        ),
    ]