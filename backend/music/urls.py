from django.urls import path
from music.views import MusicView

urlpatterns = [path("", MusicView.as_view())]
