from django.contrib import admin
from .models import Announcement

@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ('title', 'club', 'author', 'date')
    list_filter = ('club', 'date')
    search_fields = ('title', 'content')
