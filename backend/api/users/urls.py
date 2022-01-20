from django.urls import path, include

from .views import APILoginView, CreateUserView

urlpatterns = [
    path('register/', CreateUserView.as_view(), name='register-view'),
    path('login/', APILoginView.as_view(), name='login-view'),
]
