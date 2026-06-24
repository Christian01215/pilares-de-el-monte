from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VinoViewSet, CepaViewSet, SeccionViewSet, ClaseViewSet

router = DefaultRouter()
router.register(r'cepas', CepaViewSet)
router.register(r'vinos', VinoViewSet)
router.register(r'secciones', SeccionViewSet)
router.register(r'clases', ClaseViewSet)

urlpatterns = [
    path('', include(router.urls)),
]