from django.contrib import admin

# Register your models here.
from .models import PTProfile, Project

admin.site.register(PTProfile)
admin.site.register(Project)
