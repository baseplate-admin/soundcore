from utility import views
from django.urls import path

urlpatterns = [
    path("song", views.get_song, name="song_generator"),
    path("random_song", views.get_random_songs, name="random_song_generator"),
    path("capture/volume", views.user_volume_capture, name="user_volume_capture"),
    path(
        "capture/previous_song",
        views.user_previous_song_capture,
        name="user_previous_song_capture",
    ),
    path('capture/last_song', views.user_last_song_capture,name='user_last_song_capture')
]
