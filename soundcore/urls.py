from soundcore import views
from django.urls import path

urlpatterns = [
    path("home/", views.soundcore_home, name="home"),
    path("library/", views.library_show, name="library_home"),
    path(
        "libraries/<str:short_url>/", views.library_items_show, name="library_item_show"
    ),
    path(
        "library/create/",
        views.library_create,
        name="library_generator",
    ),
]
