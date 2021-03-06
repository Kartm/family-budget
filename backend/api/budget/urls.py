from django.urls import path

from . import views

urlpatterns = [
    path('budgets/', views.BudgetListCreateView.as_view()),
    path('budgets/<int:id>/', views.BudgetRetrieveDetailView.as_view()),
    path('entries/', views.BudgetEntriesCreateView.as_view()),
    path('categories/', views.BudgetEntryCategoriesListView.as_view()),
]