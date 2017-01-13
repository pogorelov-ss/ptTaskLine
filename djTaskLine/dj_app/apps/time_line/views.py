from django.contrib.auth.models import User
from rest_framework import viewsets, permissions

from .mixins import DetailSerializerMixin
from .permissions import IsOwner, IsOwnerOrReadOnly
from .models import PTProfile, Project
from .serializers import UserSerializer, PTProfileSerializer, ProjectSerializer, PTProfileSerializerList, \
    ProjectSerializerList


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProjectViewSet(DetailSerializerMixin, viewsets.ModelViewSet):
    serializer_detail_class = ProjectSerializer
    permission_classes = (IsOwnerOrReadOnly, permissions.IsAuthenticated,)
    queryset = Project.objects.all()
    serializer_class = ProjectSerializerList

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PTProfileViewSet(DetailSerializerMixin, viewsets.ModelViewSet):
    serializer_detail_class = PTProfileSerializer
    permission_classes = (IsOwner, permissions.IsAuthenticated,)
    queryset = PTProfile.objects.all()
    serializer_class = PTProfileSerializerList
