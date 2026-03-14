from django.urls import path
from . import views

urlpatterns = [
    path("notifications/", views.notifications_collection, name="notifications_collection"),
    path("notifications/<int:id>/", views.notification_resource, name="notification_resource"),
]
