# Generated by Django 4.1 on 2022-10-09 12:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_blog_description'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id_no', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('email', models.EmailField(max_length=254)),
                ('name', models.CharField(max_length=1000)),
                ('subject', models.CharField(max_length=1000)),
                ('description', models.TextField()),
            ],
        ),
    ]
