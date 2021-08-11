from django.urls import path
from .views import CaptureVolume

urlpatterns = [
    path("volume", CaptureVolume.as_view(), name="volume_capture"),
]
