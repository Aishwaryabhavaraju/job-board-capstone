from django.contrib import admin
from django.urls import path, include
from .api_router import urlpatterns as api_urls
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [

    path(
        "admin/",
        admin.site.urls
    ),

    path(
        "api/",
        include("accounts.urls")
    ),

    path(
        "api/jobs/",
        include("jobs.urls")
    ),

    path(
        "api/profiles/",
        include("profiles.urls")
    ),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path(
        'api/', 
        include('applications.urls')
    ),
    # API
    path('api/', include(api_urls)),

    # JWT
    path('api/', include('rest_framework.urls')),

]

if settings.DEBUG:

    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )