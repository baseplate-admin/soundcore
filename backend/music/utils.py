from PIL import Image
from io import BytesIO

from mutagen.flac import FLAC

from django.core.files.base import ContentFile

from .models import Upload
from django.http import Http404


def flac_upload_handler(file):
    """
    This function takes in a flac file extracts info and saves it to database.
    """
    if not file.name.endswith(".flac"):
        raise Http404

    flac_dict = FLAC(file)
    try:
        artist = flac_dict.get("artist", None)
        artist = ",".join(map(str, artist))
    except TypeError:
        artist = None
    try:
        title = flac_dict.get("title", None)
        title = ",".join(map(str, title))
    except TypeError:
        title = None

    try:
        album = flac_dict.get("album", None)
        album = ",".join(map(str, album))
    except TypeError:
        album = None

    try:
        date = flac_dict.get("date", None)
        date = ",".join(map(str, date))
    except TypeError:
        date = None

    try:
        lyricist = flac_dict.get("lyricist", None)
        lyricist = ",".join(map(str, lyricist))
    except TypeError:
        lyricist = None
    try:
        composer = flac_dict.get("composer", None)
        composer = ",".join(map(str, composer))
    except TypeError:
        composer = None

    try:
        genre = flac_dict.get("genre", None)
        genre = ",".join(map(str, genre))
    except TypeError:
        genre = None

    try:
        picture = flac_dict.pictures[0]
        im = Image.open(BytesIO(picture.data))
        _in_memory_object = BytesIO()
        im.save(_in_memory_object, format="WebP")
        image = ContentFile(_in_memory_object.getvalue(), f"{title}.webp")

    except IndexError:
        image = None

    bitrate = flac_dict.info.bitrate
    length = flac_dict.info.length
    sample_rate = flac_dict.info.sample_rate

    database = Upload.objects.create(
        song_name=title,
        song_file=file,
        artist=artist,
        album=album,
        album_art=image,
        date=date,
        lyricist=lyricist,
        composer=composer,
        genre=genre,
        bitrate=bitrate,
        length=length,
        sample_rate=sample_rate,
        mime_type="flac",
    )
    database.save()
