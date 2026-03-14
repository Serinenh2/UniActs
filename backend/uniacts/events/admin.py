from django.contrib import admin
from .models import Event, Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'time', 'location', 'organizer_club', 'organizer_user', 'status')
    list_filter = ('date', 'category', 'organizer_club', 'status')
    search_fields = ('title', 'description', 'location')
