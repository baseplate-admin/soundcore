# Generated by Django 4.0a1 on 2021-10-01 09:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('music', '0002_rename_upload_uploadmodel'),
    ]

    operations = [
        migrations.CreateModel(
            name='CaptureTimestampModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.FloatField()),
                ('song_duration', models.FloatField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='auth.user')),
            ],
            options={
                'ordering': ('user',),
            },
        ),
        migrations.CreateModel(
            name='CapturePreviousSongModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('previous_song', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='music.uploadmodel')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='auth.user')),
            ],
        ),
    ]
