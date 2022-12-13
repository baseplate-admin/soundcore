import io
import json
from django.db.models import F
from django.http import Http404
from django.conf import settings
from django.core import serializers
from upload.models import MusicList
from analytics.models import AnalyticsHitCount
from utility.models import UserLastSongCapture
from utility.models import UserVolumeInputCapture
from utility.models import UserPreviousSongCapture
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_protect
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.decorators import login_required


# Create your views here.


@login_required()
def get_song(request):
    if request.method == "GET":
        _id = request.GET["id"]
        database = MusicList.objects.get(id=_id)
        try:
            music_hit = AnalyticsHitCount.objects.get(music=database)
        except ObjectDoesNotExist:
            AnalyticsHitCount.objects.create(music=database).save()
            music_hit = AnalyticsHitCount.objects.get(music=database)

        if not AnalyticsHitCount.objects.filter(user__in=[request.user.id], music__in=[database.id]).exists():
            music_hit.user.add(request.user)

        music_hit.hit_count = F('hit_count') + 1
        music_hit.save()

        mime_type = database.mime_type
        data = database.song_file
        media_path = settings.MEDIA_ROOT
        file_location = f"{media_path}/{data}"

        if mime_type == "flac":
            if not settings.DEBUG:
                response = HttpResponse()
                response["X-Sendfile"] = file_location
                del response["content-type"]
                return response
            else:
                with open(file_location, "rb") as f:
                    data = io.BytesIO(f.read())
                    return HttpResponse(data, content_type="audio/flac")
        else:
            raise Http404


@csrf_protect
def get_random_songs(request):
    if request.method == "POST":
        # This will be powered by an AI.
        database = MusicList.objects.order_by("?").first()
        data = serializers.serialize("json", [database])
        return JsonResponse(data, safe=False)


@login_required()
@csrf_protect
def user_volume_capture(request):
    """
    A Simple way to store User Volume
    """
    if request.method == "GET":
        database = UserVolumeInputCapture.objects.filter(user=request.user)
        if not database.exists():
            # If the user visits the site for first time set volume to 50
            UserVolumeInputCapture.objects.create(user=request.user, volume=50).save()
            database = UserVolumeInputCapture.objects.filter(user=request.user)

        data = serializers.serialize("json", database, fields=("volume",))

        return JsonResponse(data, safe=False)
    elif request.method == "POST":
        data_dictionary = dict(request.POST.lists())
        for volume in data_dictionary:
            try:
                database = UserVolumeInputCapture.objects.get(user=request.user)
            except ObjectDoesNotExist:
                UserVolumeInputCapture.objects.create(
                    user=request.user, volume=50
                ).save()
                database = UserVolumeInputCapture.objects.get(user=request.user)

            database.volume = volume
            database.save()
        return HttpResponse(status=200)


@login_required()
@csrf_protect
def user_previous_song_capture(request):
    if request.method == "GET":
        UserPreviousSongCapture.objects.filter(user=request.user).last().delete()
        database = UserPreviousSongCapture.objects.filter(user=request.user).last()
        data = serializers.serialize("json", [database], fields=("previous_song",))
        return JsonResponse(data, safe=False)

    elif request.method == "POST":
        request_data = request.POST
        for item in request_data:
            data = json.loads(item)["pk"]
            try:
                if not (
                        UserPreviousSongCapture.objects.last().previous_song.id == data
                ):
                    UserPreviousSongCapture.objects.create(
                        previous_song=MusicList.objects.get(id=data), user=request.user
                    ).save()
            except AttributeError:
                UserPreviousSongCapture.objects.create(
                    previous_song=MusicList.objects.get(id=data), user=request.user
                ).save()
            return HttpResponse(status=200)


@login_required()
@csrf_protect
def user_last_song_capture(request):
    if request.method == "GET":
        database = UserLastSongCapture.objects.get(user=request.user)
        data = serializers.serialize('json', [database], fields=('last_song', 'timestamp', 'song_duration'))
        return JsonResponse(data, safe=False)

    elif request.method == "POST":
        request_data = dict(request.POST.lists())
        for data in request_data:
            data = json.loads(data)
            song_id = data['song']
            timestamp = data['timestamp']
            song_duration = data['song_duration']
            try:
                database = UserLastSongCapture.objects.get(user=request.user)
                database.last_song = MusicList.objects.get(id=song_id)
                database.timestamp = timestamp
                database.song_duration = song_duration
                database.save()
            except ObjectDoesNotExist:
                UserLastSongCapture.objects.create(last_song=MusicList.objects.get(id=song_id), user=request.user,
                                                   timestamp=timestamp, song_duration=song_duration)

            return HttpResponse(status=200)
