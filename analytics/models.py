from django.db import models
from upload.models import MusicList
from django.contrib.auth.models import User


# Create your models here.


class AnalyticsHitCount(models.Model):
    music = models.ForeignKey(MusicList, on_delete=models.CASCADE, null=False)
    hit_count = models.IntegerField(default=0)
    user = models.ManyToManyField(User)

    def __str__(self) -> str:
        return str(f'Music : {self.music.song_name}  |  Hit Count : {self.hit_count}')

    class Meta:
        ordering = ('hit_count',)
