from waitress import serve
from soundcore.wsgi import application

serve(application, port="8001")
