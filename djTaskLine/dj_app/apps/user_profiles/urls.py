from django.conf.urls import url, include

from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^user-profile/$', views.CurrentUserView.as_view()),
]
