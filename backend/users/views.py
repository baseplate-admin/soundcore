import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication

from users.serializers import UserSerializer

# Create your views here.


class JailToken(APIView):
    parser_classes = [JSONParser]

    def put(self, request):
        data = json.loads(request.body)

        token = RefreshToken(data["refresh"])
        token.blacklist()

        return Response(200)


class UserInfo(APIView):
    authentication_classes = [
        JWTAuthentication,
    ]

    def get(self, request):
        data = User.objects.get(id=request.user.id)
        serializer = UserSerializer(data, many=False)
        return Response(serializer.data)
