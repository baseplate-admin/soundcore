# Generated by Django 4.0a1 on 2021-10-01 10:00

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_alter_userdatabase_previous_song_index'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdatabase',
            name='previous_song_index',
            field=models.PositiveIntegerField(default=1, validators=[django.core.validators.MinValueValidator(1)]),
        ),
    ]
