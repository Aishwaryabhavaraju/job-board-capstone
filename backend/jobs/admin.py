from django.contrib import admin
from .models import Job


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "title",
        "company",
        "location",
        "job_type",
        "salary",
        "posted_by",
        "created_at",
    )

    search_fields = (
        "title",
        "company",
        "location",
    )

    list_filter = (
        "job_type",
        "location",
    )

    ordering = (
        "-created_at",
    )