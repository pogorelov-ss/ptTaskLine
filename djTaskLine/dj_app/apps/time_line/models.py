from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField
from django.db import models

from django.db.models.signals import post_save
from django.dispatch import receiver


class PTProfile(models.Model):
    user = models.OneToOneField(User, related_name='pt_profile', on_delete=models.CASCADE)
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
    instance.pt_profile.save()


class Project(models.Model):
    user = models.ForeignKey(User, related_name='project', on_delete=models.CASCADE)
    pt_profile = models.ForeignKey(PTProfile, related_name='project', on_delete=models.CASCADE)
    project_id = models.IntegerField(verbose_name='pivotaltracker Project ID')

    class Meta:
        pass


class TaskLine(models.Model):
    user = models.ForeignKey(User, related_name='task_line')
    project = models.ForeignKey(Project, related_name='task_line', null=True)
    task_id = models.IntegerField()
    started_at = models.DateTimeField(auto_now_add=True)
