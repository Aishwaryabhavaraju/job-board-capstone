from rest_framework.permissions import BasePermission


class IsApplicantOrReadOnly(BasePermission):
    """
    Only the applicant can edit/delete their application.
    Others can only read if allowed by view.
    """

    def has_object_permission(self, request, view, obj):
        # Safe methods (GET, HEAD, OPTIONS) allowed
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True

        # Only the owner of application can modify it
        return obj.applicant == request.user


class IsRecruiterOrAdmin(BasePermission):
    """
    Only recruiter, admin, or the job's employer can change application status.
    """

    def has_permission(self, request, view):
        return request.user and (
            request.user.is_staff or 
            request.user.is_superuser or 
            request.user.role == "employer"
        )

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser or request.user.is_staff:
            return True
        return obj.job.posted_by == request.user