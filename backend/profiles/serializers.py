from rest_framework import serializers
from .models import ApplicantProfile


class ApplicantProfileSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    email = serializers.EmailField(
        source="user.email",
        read_only=True
    )

    class Meta:

        model = ApplicantProfile

        fields = [

            "id",

            "username",

            "email",

            "phone",

            "address",

            "skills",

            "education",

            "experience",

            "resume",

            "linkedin",

            "github",

            "portfolio",

            "created_at",

            "updated_at",

        ]

        read_only_fields = (

            "id",

            "username",

            "email",

            "created_at",

            "updated_at",

        )

    # -------------------------------
    # Phone Validation
    # -------------------------------

    def validate_phone(self, value):

        if not value.isdigit():
            raise serializers.ValidationError(
                "Phone number should contain only digits."
            )

        if len(value) < 10 or len(value) > 15:
            raise serializers.ValidationError(
                "Phone number must be between 10 and 15 digits."
            )

        return value

    # -------------------------------
    # Resume Validation
    # -------------------------------

    def validate_resume(self, value):

        if value:

            allowed_extensions = [
                ".pdf",
                ".doc",
                ".docx"
            ]

            file_name = value.name.lower()

            if not any(file_name.endswith(ext) for ext in allowed_extensions):

                raise serializers.ValidationError(
                    "Resume must be PDF, DOC or DOCX."
                )

            if value.size > 5 * 1024 * 1024:

                raise serializers.ValidationError(
                    "Resume size should not exceed 5 MB."
                )

        return value

    # -------------------------------
    # Create Validation
    # -------------------------------

    def create(self, validated_data):

        request = self.context["request"]

        user = request.user

        # Only Job Seekers

        if user.role != "job_seeker":

            raise serializers.ValidationError(
                "Only Job Seekers can create an applicant profile."
            )

        # Prevent Duplicate Profile

        if ApplicantProfile.objects.filter(user=user).exists():

            raise serializers.ValidationError(
                "Applicant profile already exists."
            )

        profile = ApplicantProfile.objects.create(

            user=user,

            **validated_data

        )

        return profile

    # -------------------------------
    # Update Validation
    # -------------------------------

    def update(self, instance, validated_data):

        for attr, value in validated_data.items():

            setattr(instance, attr, value)

        instance.save()

        return instance