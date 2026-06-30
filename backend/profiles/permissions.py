from rest_framework.permissions import BasePermission


class IsProfileOwner(BasePermission):
    """
    Allow access only to the owner of the profile.
    """

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user