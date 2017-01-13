from django.contrib.auth.models import User
from rest_framework import serializers

from .models import PTProfile, Project, TaskLine


class ProjectSerializerList(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = ('id', 'project_id', 'user', 'pt_profile')


class TaskLineSerializer(serializers.ModelSerializer):

    class Meta:
        model = TaskLine
        fields = ('task_id', 'started_at')


class PTProfileSerializer(serializers.ModelSerializer):
    project = ProjectSerializerList(many=True, read_only=True)

    class Meta:
        model = PTProfile
        fields = ('id', 'api_token', 'related_json', 'project')


class PTProfileSerializerList(serializers.ModelSerializer):

    class Meta:
        model = PTProfile
        fields = ('api_token', 'related_json')


class ProjectSerializer(serializers.ModelSerializer):
    pt_profile = PTProfileSerializer()

    class Meta:
        model = Project
        fields = ('project_id', 'pt_profile')


class UserSerializer(serializers.ModelSerializer):
    pt_profile = PTProfileSerializerList(many=False, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'pt_profile')
