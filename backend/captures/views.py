from rest_framework import generics
from rest_framework.response import Response
from .serializers import CaptureVolumeSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication

# Create your views here.


class CaptureVolume(generics.CreateAPIView):
    authentication_classes = [
        JWTAuthentication,
    ]
    serializer_class = CaptureVolumeSerializer

    def post(self, request):
        serializer = CaptureVolumeSerializer(data=request.data, many=False)

        if serializer.is_valid():
            serializer.save()
            return Response(200)

        else:
            print(serializer.errors)
            return Response(402)
