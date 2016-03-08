# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calendars', '0028_auto_20160225_2336'),
    ]

    operations = [
        migrations.CreateModel(
            name='Kind',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name='event',
            name='kind',
            field=models.ForeignKey(to='calendars.Kind', null=True, blank=True, related_name='events', verbose_name='Rodzaj wydarzenia'),
        ),
    ]
