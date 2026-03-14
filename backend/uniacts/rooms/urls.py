from django.urls import path
from . import views

urlpatterns = [
    path("rooms/", views.rooms_collection, name="rooms_collection"),
    path("rooms/<int:id>/", views.room_resource, name="room_resource"),
    path("reservations/", views.reservations_collection, name="reservations_collection"),
    path("reservations/<int:id>/", views.reservation_resource, name="reservation_resource"),
]
