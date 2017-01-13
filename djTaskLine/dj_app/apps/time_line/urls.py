from django.conf.urls import url, include

from rest_framework.routers import DefaultRouter
from rest_framework.schemas import get_schema_view

from . import views

schema_view = get_schema_view(title='TaskLine app time-line endpoint schema')

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'pt-profiles', views.PTProfileViewSet)
router.register(r'projects', views.ProjectViewSet)
router.register(r'task-lines', views.TaskLineViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url('^schema/$', schema_view),
]
