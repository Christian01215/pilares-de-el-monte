from rest_framework import serializers
from .models import Vino, Cepa, Seccion, Clase


class CepaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cepa
        fields = '__all__'

class VinoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vino
        fields = '__all__'

class SeccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seccion
        fields = '__all__'

class ClaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clase
        fields = '__all__'