from users.models import CapturePreviousSongModel
from rest_framework.views import APIView
from rest_framework import generics, serializers
from rest_framework.response import Response
from rest_framework.parsers import JSONParser


from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication

from users.serializers import (
    CapturePreviousSongPostSerializer,
    CapturePreviousSongGetSerializer,
    UserSerializer,
    TokenSerializer,
)

# Create your views here.


class JailToken(generics.CreateAPIView):
    parser_classes = [JSONParser]
    serializer_class = TokenSerializer

    def post(self, request):
        serializer = TokenSerializer(data=request.data, many=False)

        if serializer.is_valid():
            serializer.save()
            return Response(200)


class UserInfo(APIView):
    authentication_classes = [
        JWTAuthentication,
    ]

    def get(self, request):
        data = User.objects.get(id=request.user.id)
        serializer = UserSerializer(data, many=False)
        return Response(serializer.data)


class CapturePreviousSong(APIView):
    parser_classes = [JSONParser]
    authentication_classes = [
        JWTAuthentication,
    ]

    def get(self, request):
        data = CapturePreviousSongModel.objects.filter(user=request.user.id)
        serializer = CapturePreviousSongGetSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CapturePreviousSongPostSerializer(
            data=request.data, many=False, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(200)


class CaptureTimeStamp(APIView):
    authentication_classes = [
        JWTAuthentication,
    ]

    def get(self, request):
        pass
