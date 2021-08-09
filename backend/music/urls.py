from django.urls import path
from music.views import MusicView, GetRandomMusicView

urlpatterns = [
    path("", MusicView.as_view()),
    path("random/", GetRandomMusicView.as_view()),
]
