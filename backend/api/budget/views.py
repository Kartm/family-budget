from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import get_object_or_404

from .models import Budget, EntryCategory
from .serializers import BudgetSerializer, BudgetDetailSerializer, BudgetEntrySerializer, BudgetEntryCategorySerializer

from django.db.models import Sum, Value, Q
from django.db.models.functions import Coalesce


class BudgetListCreateView(generics.ListCreateAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = super().get_queryset()

        owner_id = self.request.GET.get('owner_id')
        if owner_id:
            qs = qs.filter(owner_id=owner_id)

        return qs.filter(Q(owner=self.request.user) | Q(share_accesses__user__in=[self.request.user])).annotate(balance=Coalesce(Sum('entries__amount'), Value(0)))


class BudgetRetrieveDetailView(generics.RetrieveAPIView):
    serializer_class = BudgetDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        qs = Budget.objects.all().annotate(
                balance=Coalesce(Sum('entries__amount'), Value(0))
            )

        return get_object_or_404(
            qs,
            id=self.kwargs.get('id')
        )


class BudgetEntriesCreateView(generics.CreateAPIView):
    serializer_class = BudgetEntrySerializer
    permission_classes = [IsAuthenticated]


class BudgetEntryCategoriesListView(generics.ListAPIView):
    serializer_class = BudgetEntryCategorySerializer
    permission_classes = [IsAuthenticated]
    queryset = EntryCategory.objects.all()
