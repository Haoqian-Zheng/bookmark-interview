from django.contrib import admin
from .models import Bookmark, Tag


@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
    list_display = ['title', 'url', 'owner', 'created_at']
    list_filter = ['created_at', 'tags']
    search_fields = ['title', 'url', 'description']
    filter_horizontal = ['tags']


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']
