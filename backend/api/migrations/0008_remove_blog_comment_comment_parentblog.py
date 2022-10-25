# Generated by Django 4.1 on 2022-10-10 10:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_contact'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blog',
            name='comment',
        ),
        migrations.AddField(
            model_name='comment',
            name='parentBlog',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.blog'),
        ),
    ]