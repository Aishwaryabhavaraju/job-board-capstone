from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Application
from .serializers import ApplicationSerializer
from .permissions import IsApplicantOrReadOnly, IsRecruiterOrAdmin


class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated, IsApplicantOrReadOnly]

    def perform_create(self, serializer):
        # Automatically assign logged-in user as applicant
        serializer.save(applicant=self.request.user)

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return Application.objects.none()

        # Admin/superuser sees all
        if user.is_superuser or user.is_staff:
            return Application.objects.all()

        # Employer sees applications for their posted jobs
        if user.role == "employer":
            return Application.objects.filter(job__posted_by=user)

        # Candidate sees only their own applications
        return Application.objects.filter(applicant=user)

    @action(detail=True, methods=['patch'], permission_classes=[IsRecruiterOrAdmin])
    def update_status(self, request, pk=None):
        """
        Custom endpoint for recruiter/employer/admin to update status
        Example: /applications/1/update_status/
        """
        application = self.get_object()
        new_status = request.data.get("status")

        if not new_status:
            return Response(
                {"error": "Status is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        status_map = {
            "pending": "Pending",
            "shortlisted": "Shortlisted",
            "rejected": "Rejected",
            "accepted": "Accepted",
        }

        normalized_status = status_map.get(str(new_status).lower())
        if not normalized_status:
            return Response(
                {"error": "Invalid status. Choose from: Pending, Shortlisted, Rejected, Accepted"},
                status=status.HTTP_400_BAD_REQUEST
            )

        application.status = normalized_status
        application.save()

        return Response({
            "message": "Status updated successfully",
            "status": application.status
        })