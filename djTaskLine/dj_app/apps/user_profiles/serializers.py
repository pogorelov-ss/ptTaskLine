from django.contrib.auth.models import User
from rest_framework import serializers

from apps.time_line.serializers import PTProfileSerializer


class UserSerializer(serializers.ModelSerializer):
    pt_profile = PTProfileSerializer(many=False, read_only=True)

    class Meta:
        model = User
        fields = (
            'id', 'last_login', 'is_superuser', 'username', 'first_name', 'last_name', 'email', 'is_staff', 'is_active',
            'date_joined', 'groups', 'user_permissions', 'pt_profile')
