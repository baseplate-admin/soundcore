from django.db import models

# Create your models here.


class Upload(models.Model):
    music = models.FileField(upload_to="song/")

    def __str__(self) -> str:
        return f"{self.id}"
