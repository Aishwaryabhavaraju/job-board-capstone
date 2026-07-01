from rest_framework import serializers
from .models import Job


class JobSerializer(serializers.ModelSerializer):

    employer_name = serializers.CharField(
        source="posted_by.username",
        read_only=True
    )

    employer_email = serializers.EmailField(
        source="posted_by.email",
        read_only=True
    )

    applications_count = serializers.IntegerField(
        source="applications.count",
        read_only=True
    )

    class Meta:

        model = Job

        fields = [

            "id",

            "title",

            "company",

            "location",

            "job_type",

            "salary",

            "description",

            "requirements",

            "posted_by",

            "employer_name",

            "employer_email",

            "applications_count",

            "created_at",

            "updated_at",

        ]

        read_only_fields = (

            "posted_by",

            "created_at",

            "updated_at",

        )