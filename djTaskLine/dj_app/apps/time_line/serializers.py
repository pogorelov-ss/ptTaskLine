from django.contrib.auth.models import User
from rest_framework import serializers

from .models import PTProfile, Project


class PTProfileSerializer(serializers.ModelSerializer):
    projects = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = PTProfile
        fields = ('api_token', 'related_json', 'projects')


class PTProfileSerializerList(serializers.ModelSerializer):

    class Meta:
        model = PTProfile
        fields = ('api_token', 'related_json')


class ProjectSerializerList(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = ('project_id', )


class ProjectSerializer(serializers.ModelSerializer):
    pt_profile = PTProfileSerializer()

    class Meta:
        model = Project
        fields = ('project_id', 'pt_profile')


class UserSerializer(serializers.ModelSerializer):
    pt_profile = PTProfileSerializer(many=False, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'pt_profile')
