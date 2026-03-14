from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('role', 'profile_picture', 'bio', 'student_number', 'department')}),
    )
    list_display = ('username', 'email', 'role', 'is_staff', 'department')
    list_filter = ('role', 'is_staff', 'is_superuser', 'department')

admin.site.register(User, CustomUserAdmin)
