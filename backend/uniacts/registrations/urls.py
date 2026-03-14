from django.urls import path
from . import views

urlpatterns = [
    path("registrations/", views.registrations_collection, name="registrations_collection"),
    path("registrations/<int:id>/", views.registration_resource, name="registration_resource"),
]
