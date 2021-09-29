from music.serializers import MusicSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FileUploadParser
from music.models import UploadModel
from rest_framework_simplejwt.authentication import JWTAuthentication
from .utils import flac_upload_handler

# Create your views here.


class MusicView(APIView):
    parser_classes = [MultiPartParser, FileUploadParser]
    authentication_classes = [
        JWTAuthentication,
    ]

    def get(self, request):
        data = UploadModel.objects.all()
        serailizer = MusicSerializer(data, many=True)
        return Response(serailizer.data, 200)

    def put(self, request):
        # if request.user.is_superuser:
        file = request.data["file"]
        if file.name.endswith(".flac"):
            flac_upload_handler(file)
        elif file.name.endswith("mp3"):
            pass

        return Response(status=201)


class GetRandomMusicView(APIView):
    def get(self, request):
        # This will be powered by an AI.
        database = UploadModel.objects.order_by("?").first()
        serializer = MusicSerializer(database)
        return Response(serializer.data, 200)
