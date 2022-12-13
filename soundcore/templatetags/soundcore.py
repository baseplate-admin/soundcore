import time

from django import template
from soundcore.models import LibraryGenerator
from core.middlewares.request import RequestMiddleware

register = template.Library()


@register.inclusion_tag("tags/playlist.html")
def get_total_playlist():
    # This function is linked to "soundcore/templates/tags/playlist.html"
    # This function is used by left-menu.html

    request = RequestMiddleware(get_response=None)
    request = request.thread_local.current_request

    # Check if user is Authenticated or return No Playlist.
    try:
        playlist = LibraryGenerator.objects.filter(owner=request.user)
    except TypeError:
        playlist = None

    return {"data": playlist, "request": request}


@register.filter(name="format_seconds")
def convert(seconds):
    ty_res = time.gmtime(seconds)
    if 3600 <= seconds:
        res = time.strftime("%H:%M:%S", ty_res)
    elif 3600 > seconds >= 60:
        res = time.strftime("%M:%S", ty_res)
    elif 60 > seconds >= 0:
        res = time.strftime("%Ss", ty_res)
    else:
        res = 0
    return res
