from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField
from django.db import models

from django.db.models.signals import post_save
from django.dispatch import receiver


class PTProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    api_token = models.UUIDField(verbose_name='pivotaltracker API token', null=True)
    related_json = JSONField(blank=True, null=True)

    class Meta:
        pass


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        PTProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.ptprofile.save()


class Project(models.Model):
    user = models.ForeignKey(User)
    pt_profile = models.ForeignKey(PTProfile)
    project_id = models.IntegerField(verbose_name='pivotaltracker Project ID')

    class Meta:
        pass