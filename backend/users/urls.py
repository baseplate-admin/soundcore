from users.views import CaptureVolume
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from users.views import JailToken, UserInfo

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/blacklist/", JailToken.as_view(), name="token_blacklist"),
    path("info/", UserInfo.as_view(), name="user_info"),
    path("capture/volume", CaptureVolume.as_view(), name="volume_capture"),
]
