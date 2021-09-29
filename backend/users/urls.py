from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from users.views import CapturePreviousSong, JailToken, UserInfo

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/blacklist/", JailToken.as_view(), name="token_blacklist"),
    path("info/", UserInfo.as_view(), name="user_info"),
    path(
        "capture/previous_song/",
        CapturePreviousSong.as_view(),
        name="capture_previous_song",
    ),
]
