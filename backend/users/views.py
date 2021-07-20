import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework_simplejwt.backends import TokenBackend
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.authentication import JWTAuthentication

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
        token = request.META.get("HTTP_AUTHORIZATION", " ").split(" ")[1]
        try:
            valid_data = TokenBackend(algorithm="HS256").decode(token, verify=False)
            user = valid_data["user"]
            request.user = user
            user_object = User.objects.get(username=user)
            return Response(user_object, 200)

        except ValidationError as v:
            print("validation error", v)
            return Response(401, v)
