from django.urls import path

from . import views

urlpatterns = [
    path('budgets/', views.BudgetListCreateView.as_view()),
    # path('articles/<int:year>/', views.year_archive),
]