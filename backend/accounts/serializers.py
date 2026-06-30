from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer to display user details.
    """

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "role",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer used to register a new user.
    """

    password = serializers.CharField(
        write_only=True,
        min_length=6,
        style={"input_type": "password"},
    )

    confirm_password = serializers.CharField(
        write_only=True,
        style={"input_type": "password"},
    )

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "confirm_password",
            "role",
        ]

    def validate_email(self, value):

        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Email already exists."
            )

        return value

    def validate(self, attrs):

        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                {
                    "confirm_password":
                    "Passwords do not match."
                }
            )

        return attrs

    def create(self, validated_data):

        validated_data.pop("confirm_password")

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            role=validated_data["role"],
        )

        return user