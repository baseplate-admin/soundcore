from .models import CapturePreviousSongModel
from rest_framework.parsers import JSONParser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from django.db.models import F
from users.models import UserDatabase

# Create your views here.


class CapturePreviousSong(APIView):
    parser_classes = [JSONParser]
    authentication_classes = [
        JWTAuthentication,
    ]

    def get(self, request):
        if UserDatabase.objects.filter(user=request.user.id).exists():
            database = UserDatabase.objects.get(user=request.user.id)
            index = database.previous_song_index

            if not index > CapturePreviousSongModel.objects.all().count()-1:
                database.previous_song_index = F("previous_song_index") + 1
                database.save()
            else:
                index = CapturePreviousSongModel.objects.all().count() - 1
            data = CapturePreviousSongModel.objects.filter(user=request.user.id).order_by('-id')[index]
            serializer = CapturePreviousSongGetSerializer(data, many=False)
            return Response(serializer.data)

        return Response(status=402)

    def post(self, request):
        serializer = CapturePreviousSongPostSerializer(
            data=request.data, many=False, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(200)


class CaptureVolume(APIView):
    authentication_classes = [
        JWTAuthentication,
    ]
    parser_classes = [JSONParser]

    def get(self, request):
        if UserDatabase.objects.filter(user=request.user.id).exists():
            data = UserDatabase.objects.get(user=request.user.id)
            serializer = CaptureVolumeGetSerializer(data)
            return Response(serializer.data)

        return Response(status=402)

    def post(self, request):
        serializer = CaptureVolumePostSerializer(
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
