from django.db import models
from django.conf import settings
from jobs.models import Job


class Application(models.Model):

    STATUS_CHOICES = (
        ("Pending", "Pending"),
        ("Shortlisted", "Shortlisted"),
        ("Rejected", "Rejected"),
        ("Accepted", "Accepted"),
    )

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name="applications"
    )

    applicant = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="applications"
    )

    cover_letter = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending"
    )

    applied_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = ["-applied_at"]
        constraints = [
            models.UniqueConstraint(
                fields=["job", "applicant"],
                name="unique_job_application"
            )
        ]

    def __str__(self):
        return f"{self.applicant.username} applied for {self.job.title}"