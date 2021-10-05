from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


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
