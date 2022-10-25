from django.contrib import admin
from user.models import CustomUser
# Register your models here.


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['email', 'name', 'profession', 'is_active', 'is_superuser']
