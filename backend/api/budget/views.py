from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import get_object_or_404

from .models import Budget
from .serializers import BudgetSerializer, BudgetDetailSerializer

from django.db.models import Sum, Value
from django.db.models.functions import Coalesce

class BudgetListCreateView(generics.ListCreateAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = super().get_queryset()

        return qs.filter(owner=self.request.user).annotate(balance=Coalesce(Sum('entries__amount'), Value(0)))


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
