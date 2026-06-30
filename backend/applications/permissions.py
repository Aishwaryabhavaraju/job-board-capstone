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
    Only recruiter or admin can change application status.
    """

    def has_permission(self, request, view):
        return request.user and (
            request.user.is_staff or request.user.is_superuser
        )