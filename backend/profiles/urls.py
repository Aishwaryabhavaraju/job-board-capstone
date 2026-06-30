from rest_framework.routers import DefaultRouter
from .views import ApplicantProfileViewSet

router = DefaultRouter()

router.register(
    "",
    ApplicantProfileViewSet,
    basename="profiles"
)

urlpatterns = router.urls