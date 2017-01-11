from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView


class UserProfileTemporaryView(TemplateView):
    template_name = 'user_profiles/user-profile-temporary.html'
