from django.urls import path, include

from .views import APILoginView, CreateUserView, UserDetailsView, UserListView

urlpatterns = [
    path('register/', CreateUserView.as_view(), name='user-register-view'),
    path('login/', APILoginView.as_view(), name='user-login-view'),
    path('details/', UserDetailsView.as_view(), name='user-details-view'),
    path('users/', UserListView.as_view(), name='user-list-view'),
]
