# Generated by Django 4.0a1 on 2021-10-01 17:57

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_alter_userdatabase_previous_song_index'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdatabase',
            name='volume',
            field=models.FloatField(default=20, validators=[django.core.validators.MaxValueValidator(1), django.core.validators.MinValueValidator(0)]),
        ),
    ]