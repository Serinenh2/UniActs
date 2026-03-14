from django.urls import path
from . import views

urlpatterns = [
    path("clubs/", views.clubs_collection, name="clubs_collection"),
    path("clubs/<int:id>/", views.club_resource, name="club_resource"),
    path("clubs/<int:id>/join/", views.join_club, name="join_club"),
    path("clubs/<int:id>/members/", views.club_members, name="club_members"),
]
