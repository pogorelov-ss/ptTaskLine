# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-01-13 22:00
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('time_line', '0004_auto_20170113_2030'),
    ]

    operations = [
        migrations.CreateModel(
            name='TaskLine',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('task_id', models.IntegerField()),
                ('started_at', models.DateTimeField(auto_now_add=True)),
                ('project', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='task_line', to='time_line.Project')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='task_line', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]