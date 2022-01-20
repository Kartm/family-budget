from django.db import models
from django.contrib.auth.models import User
from django_extensions.db.models import TimeStampedModel


class DeletableManager(models.Manager):
    def get_query_set(self):
        return super(DeletableManager, self).get_query_set().filter(is_deleted=False)


class DeletableModel:
    is_deleted = models.BooleanField(default=False, db_index=True)
    active = DeletableManager()

    class Meta:
        abstract = True

    def delete(self):
        self.is_deleted = True
        self.save()


class Budget(TimeStampedModel, DeletableModel):
    owner = models.ForeignKey(
        User,
        related_name='budgets',
        on_delete=models.CASCADE,
    )

    name = models.CharField(max_length=200)


class EntryCategory(TimeStampedModel, DeletableModel):
    name = models.CharField(max_length=200)


class Entry(TimeStampedModel, DeletableModel):
    category = models.ForeignKey(
        EntryCategory,
        related_name='entries',
        null=True,
        on_delete=models.SET_NULL,
    )
    budget = models.ForeignKey(
        Budget,
        related_name='entries',
        on_delete=models.CASCADE,
    )

    amount = models.DecimalField(max_digits=11, decimal_places=2)
    description = models.CharField(max_length=200, blank=True)


class ShareAccess(TimeStampedModel, DeletableModel):
    budget = models.ForeignKey(
        Budget,
        related_name='share_accesses',
        on_delete=models.CASCADE,
    )
    user = models.ForeignKey(
        User,
        related_name='share_accesses',
        on_delete=models.CASCADE,
    )
