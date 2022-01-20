from rest_auth.views import (LoginView, LogoutView)
from rest_framework.authentication import TokenAuthentication
from rest_framework import permissions, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import CreateAPIView, get_object_or_404
from django.contrib.auth import get_user_model  # If used custom user model

from .serializers import UserCreateSerializer, UserDetailsSerializer


class APILoginView(LoginView):
    pass


class CreateUserView(CreateAPIView):
    model = get_user_model()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserCreateSerializer


class UserDetailsView(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserDetailsSerializer

    def get_object(self):
        return get_object_or_404(
            get_user_model(),
            id=self.request.user.id
        )
