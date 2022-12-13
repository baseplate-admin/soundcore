from django.contrib import admin
from upload.models import MusicList

# Register your models here.
admin.site.register(MusicList)

# Not needed
# from sorl.thumbnail.models import KVStore
# admin.site.register(KVStore)
