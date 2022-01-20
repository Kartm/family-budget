from django.contrib import admin

from .models import Budget, Category, Entry, ShareAccess

admin.site.register(Budget)
admin.site.register(Category)
admin.site.register(Entry)
admin.site.register(ShareAccess)
