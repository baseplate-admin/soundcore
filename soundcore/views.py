import json
import datetime
from django.shortcuts import render
from upload.models import MusicList
from django.http import Http404, HttpResponse
from soundcore.models import LibraryGenerator
from django.contrib.auth.decorators import login_required


# Create your views here.


def soundcore_home(request):
    if request.method == "GET":
        musics = MusicList.objects.all()
        return render(request, "soundcore/index.html", {"musics": musics})

    elif request.method == "POST":
        raise Http404


@login_required()
def library_show(request):
    if request.method == "GET":
        data = LibraryGenerator.objects.filter(owner=request.user)
        return render(request, "soundcore/library/index.html", {"data": data})
    elif request.method == "POST":
        raise Http404


@login_required()
def library_items_show(request, short_url: str):
    if request.method == "GET":
        data = LibraryGenerator.objects.get(short_form=short_url)
        if not (data.owner == request.user):
            raise Http404

        return render(request, "soundcore/library/items/index.html", {"data": data})
    elif request.method == "POST":
        raise Http404


@login_required()
def library_create(request):
    if request.method == "POST":
        database = LibraryGenerator(owner=request.user)
        database.last_modified = datetime.datetime.now()
        database.save()

        post_data = dict(request.POST.lists())

        for _ in post_data:
            post_data_json = json.loads(_)
            post_data_song_array = post_data_json["array"]
            post_data_library_name = post_data_json["name"]
            database.name = post_data_library_name

            for __ in post_data_song_array:
                database.musics.add(MusicList.objects.get(id=__))
                database.save()
            return HttpResponse(status=200)
    elif request.method == "GET":
        musics = MusicList.objects.all()
        return render(
            request, "soundcore/library/create/index.html", {"musics": musics}
        )
