from django.contrib import admin
from utility.models import UserVolumeInputCapture
from utility.models import UserPreviousSongCapture
from utility.models import UserLastSongCapture

# Register your models here.
admin.site.register(UserVolumeInputCapture)
admin.site.register(UserPreviousSongCapture)
admin.site.register(UserLastSongCapture)
