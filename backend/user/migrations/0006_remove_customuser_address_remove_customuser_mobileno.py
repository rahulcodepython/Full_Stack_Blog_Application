# Generated by Django 4.1 on 2022-10-25 18:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0005_alter_customuser_userimage'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='address',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='mobileNo',
        ),
    ]
