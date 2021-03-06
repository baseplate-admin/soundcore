from django.db import models
from music.models import UploadModel as Upload
from django.contrib.auth.models import User

# Create your models here.
class CapturePreviousSongModel(models.Model):
    previous_song = models.ForeignKey(Upload, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"User : {self.user} | Previous song : {self.previous_song.song_name}"

    def save(self, *args, **kwargs):
        # Allow 1/4 th Saving.
        # if CapturePreviousSongModel.objects.count() >= (Upload.objects.count() / 4):
        #     CapturePreviousSongModel.objects.first().delete()
        super().save(*args, **kwargs)


class CaptureTimestampModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.FloatField()
    song_duration = models.FloatField()

    class Meta:
        ordering = ("user",)

    def __str__(self) -> str:
        return f"User : {self.user} | TimeStamp : {self.timestamp}"
