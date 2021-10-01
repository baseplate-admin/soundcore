from django.urls import path
from .views import *

urlpatterns = [
    path(
        "previous_song/",
        CapturePreviousSong.as_view(),
        name="capture_previous_song",
    ),
    path("volume/", CaptureVolume.as_view(), name="capture_volume"),
]
