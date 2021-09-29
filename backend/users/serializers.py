from music.serializers import MusicSerializer
from users.models import CapturePreviousSongModel
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from music.models import UploadModel


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


class CapturePreviousSongPostSerializer(serializers.Serializer):
    last_song = serializers.CharField(max_length=1024)  # Max Length from music.models

    def create(self, validated_data):
        previous_song = UploadModel.objects.get(
            song_name__exact=validated_data["last_song"]
        )
        database = CapturePreviousSongModel(
            previous_song=previous_song,
            previous_song_index=0,
            user=self.context["request"].user,
        )
        database.save()
        return database


class CapturePreviousSongGetSerializer(serializers.ModelSerializer):
    previous_song = MusicSerializer(many=False, read_only=True)

    class Meta:
        model = CapturePreviousSongModel
        fields = ("previous_song",)
        # exclude = (
        #     "id",
        #     "user",
        # )
