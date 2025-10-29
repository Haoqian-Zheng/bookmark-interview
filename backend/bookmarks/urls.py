from django.urls import path
from .views import BookmarkListCreateView, BookmarkDetailView, TagListView

urlpatterns = [
    path('', BookmarkListCreateView.as_view(), name='bookmark-list'),
    path('<int:pk>/', BookmarkDetailView.as_view(), name='bookmark-detail'),
    path('tags/', TagListView.as_view(), name='tag-list'),
]
