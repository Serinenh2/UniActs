from django.urls import path
from . import views

urlpatterns = [
    path("announcements/", views.announcements_collection, name="announcements_collection"),
    path("announcements/<int:id>/", views.announcement_resource, name="announcement_resource"),
]
