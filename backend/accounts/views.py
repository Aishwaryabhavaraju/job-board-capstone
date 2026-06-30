from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .jwt_serializers import CustomTokenObtainPairSerializer

from .models import User
from .serializers import RegisterSerializer, UserSerializer


class RegisterView(generics.CreateAPIView):
    """
    Register a new user.
    """
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class LoginView(TokenObtainPairView):

    serializer_class = CustomTokenObtainPairSerializer

    permission_classes = [permissions.AllowAny]


class UserProfileView(APIView):
    """
    Get currently logged in user.
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):

        serializer = UserSerializer(request.user)

        return Response(serializer.data)
# Create your views here.
