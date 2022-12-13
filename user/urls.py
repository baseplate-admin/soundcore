from user import views
from django.urls import path

urlpatterns = [
    path("login/", views.login_form, name="login_form"),
    path("logout/", views.logout, name="logout"),
    path("forget/", views.forget_password_form, name="forget_password_form"),
    path("register/", views.register_form, name="register_form"),
    path("reset/<str:url>/", views.reset_password_form, name="reset_password"),
]
