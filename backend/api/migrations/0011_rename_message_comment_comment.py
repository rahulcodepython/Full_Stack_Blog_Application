# Generated by Django 4.1 on 2022-10-10 13:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_rename_comment_comment_message'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='message',
            new_name='comment',
        ),
    ]