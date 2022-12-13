from upload import views
from django.urls import path

urlpatterns = [path("files/", views.file_upload_form, name="file_upload_form")]
