from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Job
from .serializers import JobSerializer
from .permissions import IsEmployerOrReadOnly


class JobViewSet(viewsets.ModelViewSet):

    serializer_class = JobSerializer

    queryset = Job.objects.all()

    permission_classes = [
        IsAuthenticatedOrReadOnly,
        IsEmployerOrReadOnly
    ]

    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    search_fields = [
        "title",
        "company",
        "location",
        "job_type",
    ]

    ordering_fields = [
        "salary",
        "created_at",
        "title",
    ]

    ordering = [
        "-created_at"
    ]

    def perform_create(self, serializer):

        serializer.save(
            posted_by=self.request.user
        )