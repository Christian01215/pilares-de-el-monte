from django.shortcuts import render
from rest_framework import viewsets
from .models import Vino, Cepa, Seccion, Clase, Recuerdo
from .serializers import VinoSerializer, CepaSerializer, SeccionSerializer, ClaseSerializer, RecuerdoSerializer

class CepaViewSet(viewsets.ModelViewSet):
    queryset = Cepa.objects.all()
    serializer_class = CepaSerializer

class VinoViewSet(viewsets.ModelViewSet):
    queryset = Vino.objects.all()
    serializer_class = VinoSerializer

class SeccionViewSet(viewsets.ModelViewSet):
    queryset = Seccion.objects.all()
    serializer_class = SeccionSerializer

class ClaseViewSet(viewsets.ModelViewSet):
    queryset = Clase.objects.all()
    serializer_class = ClaseSerializer

class RecuerdoViewSet(viewsets.ModelViewSet):
    queryset = Recuerdo.objects.all().order_by('-id')
    serializer_class = RecuerdoSerializer