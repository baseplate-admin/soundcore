from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class UserVolumeInputCapture(models.Model):
    volume = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"User : {self.user} | Volume : {self.volume}"
