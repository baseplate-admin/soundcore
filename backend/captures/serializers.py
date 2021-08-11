from rest_framework import serializers
from .models import UserVolumeInputCapture
from rest_framework.validators import ValidationError


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

            return UserVolumeInputCapture.objects.create(volume=volume, user=user)
