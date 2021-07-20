import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.


class JailToken(APIView):
    parser_classes = [JSONParser]

    def put(self, request):
        data = json.loads(request.body)

        token = RefreshToken(data["refresh"])
        token.blacklist()

        return Response(200)
