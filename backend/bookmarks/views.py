from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from .models import Bookmark, Tag
from .serializers import BookmarkSerializer, TagSerializer


class BookmarkListCreateView(generics.ListCreateAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Bookmark.objects.filter(owner=self.request.user)
        # BUG #1: N+1 query problem - missing prefetch_related('tags')
        
        # Search
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | Q(description__icontains=search)
            )
        
        # Tag filter
        tag = self.request.query_params.get('tag', None)
        if tag:
            # BUG #4: Wrong filter logic - should be tags__name__iexact
            queryset = queryset.filter(tags__name__icontains=tag)
        
        # BUG #3: No pagination
        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class BookmarkDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Bookmark.objects.filter(owner=self.request.user)

    def delete(self, request, *args, **kwargs):
        # BUG #2: Missing permission check - doesn't verify ownership
        bookmark = Bookmark.objects.get(pk=kwargs['pk'])
        bookmark.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TagListView(generics.ListAPIView):
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Return tags that the user has used
        return Tag.objects.filter(
            bookmarks__owner=self.request.user
        ).distinct()
