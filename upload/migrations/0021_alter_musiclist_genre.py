# Generated by Django 3.2.4 on 2021-06-17 16:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("upload", "0020_auto_20210617_2158"),
    ]

    operations = [
        migrations.AlterField(
            model_name="musiclist",
            name="genre",
            field=models.CharField(default=None, max_length=1024, null=True),
        ),
    ]
