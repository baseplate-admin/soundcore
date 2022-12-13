import string
import random
from django.db import models
from upload.models import MusicList
from django.contrib.auth.models import User


# Create your models here.


class ShortUrl(object):
    def __init__(self):
        self.short_letter = self.__short_letter()

    @staticmethod
    def __short_letter() -> str:
        letters = string.ascii_lowercase + string.ascii_uppercase
        rand_letters = random.choices(letters, k=16)
        rand_letters = "".join(rand_letters)
        return rand_letters

    def __does_short_exists(self) -> bool:
        if LibraryGenerator.objects.filter(
                short_form=self.short_letter
        ).exists():
            return True
        elif not LibraryGenerator.objects.filter(
                short_form=self.short_letter
        ).exists():
            return False

    def logic(self) -> str:
        if not self.__does_short_exists():
            return self.short_letter
        elif self.__does_short_exists():
            self.__short_letter()


class LibraryGenerator(models.Model):
    name = models.CharField(max_length=50, unique=True, null=False)
    musics = models.ManyToManyField(MusicList, related_name="musics",)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    short_form = models.CharField(max_length=16)
    last_modified = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("name",)

    def return_four_image(self):
        # Anchored to 'soundcore/library/index.html'
        data = LibraryGenerator.objects.get(id=self.id)
        return random.sample(list(data.musics.all()), 4)

    def count_total_length(self):
        # Anchored to 'soundcore/library/index.html'
        data = LibraryGenerator.objects.get(id=self.id)
        total_number = 0

        for i in data.musics.all():
            try:
                total_number += round(float(i.length), 2)
            except TypeError:
                # No song doesn't have length.
                pass
        return total_number

    # Modify the save option
    def save(self, *args, **kwargs) -> None:
        self.short_form = ShortUrl().logic()
        super(LibraryGenerator, self).save(*args, **kwargs)

    # Return the ID to the admin panel
    def __str__(self) -> str:
        return str(self.name)
