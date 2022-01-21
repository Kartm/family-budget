from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Budget, ShareAccess, Entry, EntryCategory
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


class BudgetEntryCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = EntryCategory
        fields = ('id', 'name', 'is_expense')


class BudgetEntrySerializer(serializers.ModelSerializer):
    category = BudgetEntryCategorySerializer(read_only=True)

    category_id = serializers.PrimaryKeyRelatedField(queryset=EntryCategory.objects.all(), source='category')
    budget_id = serializers.PrimaryKeyRelatedField(queryset=Budget.objects.all(), source='budget')

    class Meta:
        model = Entry
        fields = ('id', 'amount', 'description', 'created', 'category', 'category_id', 'budget_id')


class BudgetDetailSerializer(serializers.ModelSerializer):
    owner = UserDetailsSerializer(read_only=True)
    share_accesses = BudgetShareAccessSerializer(read_only=True, many=True)
    entries = BudgetEntrySerializer(read_only=True, many=True)
    balance = serializers.DecimalField(max_digits=11, decimal_places=2)

    class Meta:
        model = Budget
        depth = 1
        fields = ("id", "name", "created", "modified", "owner","share_accesses","entries", "balance")
