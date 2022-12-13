import os
import uvicorn
from django.conf import settings


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
settings.DEBUG = False

if __name__ == "__main__":
    uvicorn.run(
        "core.asgi:application",
        host="127.0.0.1",
        port=8000,
        log_level="info",
        workers=os.cpu_count() * 2,
    )
