# Generated by Django 3.2.4 on 2021-06-21 15:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('utility', '0004_userlastsongcapture'),
    ]

    operations = [
        migrations.AddField(
            model_name='userlastsongcapture',
            name='song_duration',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
    ]