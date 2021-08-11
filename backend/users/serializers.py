from rest_framework import serializers
from rest_framework.serializers import ValidationError
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import UserVolumeInputCapture


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "first_name",
            "last_name",
            "username",
            "email",
            "user_permissions",
        )


class TokenSerializer(serializers.Serializer):
    refresh = serializers.CharField(max_length=210)

    def create(self, validated_data):
        return RefreshToken(validated_data["refresh"]).blacklist()


class CaptureVolumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserVolumeInputCapture
        fields = ("volume",)

    def save(self, validated_data):
        user = None
        request = self.context.get("request")
        volume = validated_data["volume"]

        if request and hasattr(request, "user"):
            user = request.user

            if user.is_anonymous:
                # Can't store if theres no user
                message = f"{user} is not Registered"
                raise ValidationError(message)
            if not volume:
                message = f"{volume} is null"
                raise ValidationError(message)

            UserVolumeInputCapture.objects.create(volume=volume, user=user)
