# Generated by Django 4.1 on 2022-12-09 06:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_rename_idname_category_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='idName',
            field=models.CharField(default='', max_length=50, primary_key=True, serialize=False, unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(default='', max_length=50),
        ),
    ]
