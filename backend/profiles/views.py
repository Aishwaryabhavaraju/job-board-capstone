from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from .models import ApplicantProfile
from .serializers import ApplicantProfileSerializer
from .permissions import IsProfileOwner


class ApplicantProfileViewSet(viewsets.ModelViewSet):

    serializer_class = ApplicantProfileSerializer
    permission_classes = [
        IsAuthenticated,
        IsProfileOwner,
    ]

    def get_queryset(self):
        """
        Return only the logged-in user's profile.
        """

        return ApplicantProfile.objects.filter(
            user=self.request.user
        )

    def perform_create(self, serializer):
        """
        Create profile for logged-in Job Seeker.
        """

        if self.request.user.role != "job_seeker":
            raise PermissionDenied(
                "Only Job Seekers can create profiles."
            )

        serializer.save(
            user=self.request.user
        )

    def perform_update(self, serializer):
        """
        Update own profile only.
        """

        serializer.save()

    def perform_destroy(self, instance):
        """
        Delete own profile.
        """

        instance.delete()
