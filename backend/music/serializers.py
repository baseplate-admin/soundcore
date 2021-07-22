from music.models import Upload
from rest_framework import serializers


class MusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Upload
        fields = "__all__"
