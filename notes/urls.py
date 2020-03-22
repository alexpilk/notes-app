# subscription_api/urls.py
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('api/', include('notes_app.urls')),
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls'))  # new
]
