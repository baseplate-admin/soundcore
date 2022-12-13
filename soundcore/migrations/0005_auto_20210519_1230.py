# Generated by Django 3.2 on 2021-05-19 06:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("soundcore", "0004_auto_20210519_1207"),
    ]

    operations = [
        migrations.AddField(
            model_name="librarygenerator",
            name="library_name",
            field=models.CharField(default="hello", max_length=50),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="librarygenerator",
            name="short_form",
            field=models.CharField(max_length=16),
        ),
    ]
