from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Budget


class BudgetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Budget
        fields = ("id", "name",)
