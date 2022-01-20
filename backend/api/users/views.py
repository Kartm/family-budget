from rest_auth.views import (LoginView, LogoutView)
from rest_framework.authentication import TokenAuthentication
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import CreateAPIView
from django.contrib.auth import get_user_model # If used custom user model

from .serializers import UserSerializer


class APILoginView(LoginView):
    pass


class CreateUserView(CreateAPIView):

    model = get_user_model()
    permission_classes = [
        permissions.AllowAny # Or anon users can't register
    ]
    serializer_class = UserSerializer
