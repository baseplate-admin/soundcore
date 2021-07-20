from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FileUploadParser
from music.models import Upload

# Create your views here.


class FileUploadView(APIView):
    parser_classes = [MultiPartParser, FileUploadParser]

    def get(self, request, format=None):

        return Response(Upload.objects.all(), 200)

    def put(self, request):
        file_obj = request.data["file"]
        Upload.objects.create(music=file_obj).save()

        return Response(status=201)
