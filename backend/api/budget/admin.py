from django.contrib import admin

from .models import Budget, EntryCategory, Entry, ShareAccess

admin.site.register(Budget)
admin.site.register(EntryCategory)
admin.site.register(Entry)
admin.site.register(ShareAccess)
