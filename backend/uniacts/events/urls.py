from django.urls import path
from . import views

urlpatterns = [
    path("events/", views.events_collection, name="events_collection"),
    path("events/<int:id>/", views.event_resource, name="event_resource"),
]
