from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Budget, ShareAccess, Entry
from users.serializers import UserDetailsSerializer


class BudgetSerializer(serializers.ModelSerializer):
    balance = serializers.DecimalField(max_digits=11, decimal_places=2)

    class Meta:
        model = Budget
        fields = ("id", "name", "created", "modified","balance")


class BudgetShareAccessSerializer(serializers.ModelSerializer):
    user = UserDetailsSerializer(read_only=True)

    class Meta:
        model = ShareAccess
        fields = ('id', 'user')


class BudgetEntrySerializer(serializers.ModelSerializer):
    # user = UserDetailsSerializer(read_only=True)

    class Meta:
        model = Entry
        fields = ('id', 'amount', 'description')


class BudgetDetailSerializer(serializers.ModelSerializer):
    owner = UserDetailsSerializer(read_only=True)
    share_accesses = BudgetShareAccessSerializer(read_only=True, many=True)
    entries = BudgetEntrySerializer(read_only=True, many=True)

    balance = serializers.DecimalField(max_digits=11, decimal_places=2)

    class Meta:
        model = Budget
        depth = 1
        fields = ("id", "name", "created", "modified", "owner","share_accesses","entries", "balance")
