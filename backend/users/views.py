from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.parsers import JSONParser


from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication

from users.serializers import (
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
