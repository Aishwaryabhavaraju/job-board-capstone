from rest_framework import serializers
from .models import Application


class ApplicationSerializer(serializers.ModelSerializer):
    # Optional: show related user and job details in readable format
    applicant_name = serializers.CharField(source='applicant.username', read_only=True)
    job_title = serializers.CharField(source='job.title', read_only=True)

    class Meta:
        model = Application
        fields = [
            'id',
            'applicant',
            'applicant_name',
            'job',
            'job_title',
            'cover_letter',
            'resume',
            'status',
            'applied_at',
        ]
        read_only_fields = ['id', 'status', 'applied_at']