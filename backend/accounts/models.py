from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UserManager


class User(AbstractUser):

    EMPLOYER = "employer"
    JOB_SEEKER = "job_seeker"

    ROLE_CHOICES = (
        (EMPLOYER, "Employer"),
        (JOB_SEEKER, "Job Seeker"),
    )

    email = models.EmailField(unique=True)

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default=JOB_SEEKER
    )

    created_at = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = [
        "username",
    ]

    def __str__(self):
        return self.email
# Create your models here.
