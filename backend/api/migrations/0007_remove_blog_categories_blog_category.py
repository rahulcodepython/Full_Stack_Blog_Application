# Generated by Django 4.1 on 2022-12-09 06:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_remove_blog_category_blog_categories'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blog',
            name='categories',
        ),
        migrations.AddField(
            model_name='blog',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='BlogCategory', to='api.category'),
        ),
    ]