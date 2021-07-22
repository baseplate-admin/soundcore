from music.serializers import MusicSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FileUploadParser
from music.models import Upload
from rest_framework_simplejwt.authentication import JWTAuthentication

# Create your views here.


class MusicView(APIView):
    parser_classes = [MultiPartParser, FileUploadParser]
    authentication_classes = [
        JWTAuthentication,
    ]

    def get(self, request):
        data = Upload.objects.all()
        serailizer = MusicSerializer(data, many=True)
        return Response(serailizer.data, 200)

    def put(self, request):
        file_obj = request.data["file"]
        Upload.objects.create(music=file_obj).save()

        return Response(status=201)
    