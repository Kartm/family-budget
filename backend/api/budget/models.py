from django.db import models
from django.contrib.auth.models import User
from django_extensions.db.models import TimeStampedModel


class ActiveManager(models.Manager):
    def get_query_set(self):
        return super(ActiveManager, self).get_query_set().filter(is_deleted=False)


class StandardModel(models.Model, TimeStampedModel):
    is_deleted = models.BooleanField(default=False, db_index=True)
    active = ActiveManager()

    class Meta:
        abstract = True

    def delete(self):
        self.is_deleted = True
        self.save()


class Budget(StandardModel):
    owner = models.ForeignKey(User, related_name='budgets')

    name = models.CharField(max_length=200)


class Category(StandardModel):
    name = models.CharField(max_length=200)


class Entry(StandardModel):
    category = models.ForeignKey(Category, related_name='entries')

    amount = models.DecimalField(max_digits=11, decimal_places=2)
    description = models.CharField(max_length=200, blank=True)


class ShareAccess(StandardModel):
    question = models.ForeignKey(Budget, related_name='share_accesses')
    user = models.ForeignKey(User, related_name='share_accesses')
