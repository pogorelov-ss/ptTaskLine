from django.conf.urls import url, include

from rest_framework.routers import DefaultRouter

router = DefaultRouter()


urlpatterns = [
    url(r'^', include(router.urls)),
]
