from rest_framework import serializers
from .models import Application


class ApplicationSerializer(serializers.ModelSerializer):
    applicant_name = serializers.CharField(source='applicant.username', read_only=True)
    job_title = serializers.CharField(source='job.title', read_only=True)
    company = serializers.CharField(source='job.company', read_only=True)
    resume = serializers.SerializerMethodField()
    applicant_profile = serializers.SerializerMethodField()

    class Meta:
        model = Application
        fields = [
            'id',
            'applicant',
            'applicant_name',
            'job',
            'job_title',
            'company',
            'cover_letter',
            'resume',
            'applicant_profile',
            'status',
            'applied_at',
        ]
        read_only_fields = ['id', 'applicant', 'status', 'applied_at']

    def get_resume(self, obj):
        try:
            profile = obj.applicant.profile
            if profile and profile.resume:
                request = self.context.get('request')
                if request:
                    return request.build_absolute_uri(profile.resume.url)
                return profile.resume.url
        except Exception:
            pass
        return None

    def get_applicant_profile(self, obj):
        try:
            from profiles.serializers import ApplicantProfileSerializer
            profile = obj.applicant.profile
            return ApplicantProfileSerializer(profile, context=self.context).data
        except Exception:
            return None