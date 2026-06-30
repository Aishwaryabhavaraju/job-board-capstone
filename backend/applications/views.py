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

        # Applicants see only their applications
        if not user.is_staff:
            return Application.objects.filter(applicant=user)

        # Admin/recruiter sees all applications
        return Application.objects.all()

    @action(detail=True, methods=['patch'], permission_classes=[IsRecruiterOrAdmin])
    def update_status(self, request, pk=None):
        """
        Custom endpoint for recruiter/admin to update status
        Example: /applications/1/update_status/
        """
        application = self.get_object()
        new_status = request.data.get("status")

        if new_status not in ['pending', 'accepted', 'rejected']:
            return Response(
                {"error": "Invalid status"},
                status=status.HTTP_400_BAD_REQUEST
            )

        application.status = new_status
        application.save()

        return Response({
            "message": "Status updated successfully",
            "status": application.status
        })