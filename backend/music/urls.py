from django.urls import path
from music.views import FileUploadView

urlpatterns = [path("", FileUploadView.as_view())]
