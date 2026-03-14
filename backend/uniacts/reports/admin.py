from django.contrib import admin
from .models import Report

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('title', 'club', 'author', 'date')
    list_filter = ('club', 'date')
    search_fields = ('title', 'content')
