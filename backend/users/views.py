from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser

from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication

from users.serializers import UserSerializer, TokenSerializer

# Create your views here.


class JailToken(APIView):
    parser_classes = [JSONParser]

    def put(self, request):
        serializer = TokenSerializer(data=request.data, many=False)

        if serializer.is_valid():
            serializer.save()
            return Response(200)

        else:
            return Response(402)


class UserInfo(APIView):
    authentication_classes = [
        JWTAuthentication,
    ]

    def get(self, request):
        data = User.objects.get(id=request.user.id)
        serializer = UserSerializer(data, many=False)
        return Response(serializer.data)


class Capture(APIView):
    authentication_classes = [
        JWTAuthentication,
    ]

    def post(self, request):
        user = request.user

        if request.user.is_anonymous:
            # If theres no user dont capture anything.
            return Response(402)
