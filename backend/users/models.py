from django.db import models
from music.models import Upload
from django.contrib.auth.models import User

# Create your models here.


class UserPreviousSongCapture(models.Model):
    previous_song = models.ForeignKey(Upload, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"User : {self.user} | Previous song : {self.previous_song}"

    def save(self, *args, **kwargs):
        # Allow 1/4 th Saving.
        if UserPreviousSongCapture.objects.count() >= (Upload.objects.count() / 4):
            UserPreviousSongCapture.objects.first().delete()
        super().save(*args, **kwargs)


class UserLastSongCapture(models.Model):
    last_song = models.ForeignKey(Upload, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.FloatField()
    song_duration = models.FloatField()

    class Meta:
        ordering = ("user",)

    def __str__(self) -> str:
        return f"User : {self.user} | Last Song : {self.last_song} | TimeStamp : {self.timestamp}"
