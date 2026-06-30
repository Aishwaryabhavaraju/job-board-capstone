from rest_framework.permissions import BasePermission


class IsEmployer(BasePermission):
    """
    Permission for Employer users only.
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == "employer"
        )


class IsJobSeeker(BasePermission):
    """
    Permission for Job Seeker users only.
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == "job_seeker"
        )