from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Budget
from .serializers import BudgetSerializer


class BudgetListCreateView(generics.ListCreateAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(owner=self.request.user)

    # def get(self, request, format=None):
    #     return Response({}, status=200)