from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view),
    path('users/', views.users_collection, name='users_collection'),
    path('users/<int:id>/', views.user_resource, name='user_resource'),
]
