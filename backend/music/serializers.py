from music.models import UploadModel
from rest_framework import serializers


class MusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadModel
        fields = "__all__"
