from django.contrib import admin
from .models import Club, ClubMember

class ClubMemberInline(admin.TabularInline):
    model = ClubMember
    extra = 1

@admin.register(Club)
class ClubAdmin(admin.ModelAdmin):
    list_display = ('name', 'president', 'budget', 'created_at')
    search_fields = ('name', 'description')
    inlines = [ClubMemberInline]
