from music.serializers import MusicSerializer
from .models import CapturePreviousSongModel
from music.models import UploadModel
from rest_framework import serializers
from users.models import UserDatabase
from django.core.exceptions import ObjectDoesNotExist


class CapturePreviousSongPostSerializer(serializers.Serializer):
    last_song = serializers.CharField()

    def create(self, validated_data):
        request = self.context["request"]

        previous_song = UploadModel.objects.get(
            song_name__exact=validated_data["last_song"]
        )
        try:
            previous_song_from_database = CapturePreviousSongModel.objects.order_by(
                "-id"
            ).first()
        except ObjectDoesNotExist:
            previous_song_from_database = None
        finally:
            if previous_song_from_database is None:  # No previous object
                database = CapturePreviousSongModel(
                    previous_song=previous_song,
                    user=request.user,
                )
                database.save()

                if not UserDatabase.objects.filter(user=request.user).exists():
                    index = UserDatabase.objects.create(user=request.user)
                else:
                    index = UserDatabase.objects.get(user=request.user)

                index.previous_song_index = 0
                index.save()

            else:  # Previous object exists
                if not previous_song == previous_song_from_database.previous_song:
                    database = CapturePreviousSongModel(
                        previous_song=previous_song,
                        user=request.user,
                    )
                    database.save()

                    if not UserDatabase.objects.filter(user=request.user).exists():
                        index = UserDatabase.objects.create(user=request.user)
                    else:
                        index = UserDatabase.objects.get(user=request.user)

                    index.previous_song_index = 0
                    index.save()
                else:
                    database = CapturePreviousSongModel.objects.filter(
                        user=request.user.id
                    ).last()

            return database


class CapturePreviousSongGetSerializer(serializers.ModelSerializer):
    previous_song = MusicSerializer(many=False, read_only=True)

    class Meta:
        model = CapturePreviousSongModel
        fields = ("previous_song",)


class CaptureVolumeSerializer(serializers.ModelSerializer):
    volume = serializers.FloatField()  # Float between 1 and 0

    class Meta:
        model = UserDatabase
        fields = ("volume",)

    def create(self, validated_data):
        request = self.context["request"]

        if not UserDatabase.objects.filter(user=request.user).exists():
            database = UserDatabase.objects.create(user=request.user)
        else:
            database = UserDatabase.objects.get(user=request.user)

        database.volume = validated_data["volume"]
        database.save()
        return database
