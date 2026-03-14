from django.contrib import admin
from .models import Room, RoomReservation

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('name', 'capacity', 'is_available')
    list_filter = ('is_available',)
    search_fields = ('name',)

@admin.register(RoomReservation)
class RoomReservationAdmin(admin.ModelAdmin):
    list_display = ('room', 'requester', 'date', 'time_slot', 'status')
    list_filter = ('status', 'date', 'room')
    search_fields = ('room__name', 'requester__username')
