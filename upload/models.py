from django.db import models


# Create your models here.


class MusicList(models.Model):
    song_name = models.CharField(max_length=1024, default="", unique=True)
    song_file = models.FileField(upload_to="songs/")
    artist = models.CharField(max_length=1024, default="", null=True)
    album = models.CharField(max_length=1024, default="", null=True)
    album_art = models.FileField(upload_to="album_arts/")
    date = models.CharField(max_length=1024, default="", null=True)
    composer = models.CharField(max_length=1024, default="", null=True)
    genre = models.CharField(max_length=1024, default=None, null=True)
    lyricist = models.CharField(max_length=1024, default="", null=True)
    bitrate = models.IntegerField(default=0, null=True)
    length = models.FloatField()
    sample_rate = models.IntegerField(default=0, null=False)
    mime_type = models.CharField(max_length=15, default="", null=False)

    def __str__(self) -> str:
        return str(f"Name : {self.song_name}  |  Artist : {self.artist}  |  Genre : {self.genre}")

    class Meta:
        ordering = ("song_name",)
