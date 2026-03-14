from django.urls import path
from . import views

urlpatterns = [
    path("reports/", views.reports_collection, name="reports_collection"),
    path("reports/<int:id>/", views.report_resource, name="report_resource"),
]
