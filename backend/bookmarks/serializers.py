from rest_framework import serializers
from .models import Bookmark, Tag
from django.contrib.auth.models import User


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class BookmarkSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    tag_names = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=False
    )
    owner = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Bookmark
        fields = ['id', 'url', 'title', 'description', 'tags', 'tag_names', 
                  'owner', 'created_at', 'updated_at']
        read_only_fields = ['owner', 'created_at', 'updated_at']

    def create(self, validated_data):
        tag_names = validated_data.pop('tag_names', [])
        bookmark = Bookmark.objects.create(**validated_data)
        
        for tag_name in tag_names:
            tag, _ = Tag.objects.get_or_create(name=tag_name.lower().strip())
            bookmark.tags.add(tag)
        
        return bookmark

    def update(self, instance, validated_data):
        tag_names = validated_data.pop('tag_names', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if tag_names is not None:
            instance.tags.clear()
            for tag_name in tag_names:
                tag, _ = Tag.objects.get_or_create(name=tag_name.lower().strip())
                instance.tags.add(tag)
        
        return instance
