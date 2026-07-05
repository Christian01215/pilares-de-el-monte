from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VinoViewSet, CepaViewSet, SeccionViewSet, ClaseViewSet, RecuerdoViewSet

router = DefaultRouter()
router.register(r'cepas', CepaViewSet)
router.register(r'vinos', VinoViewSet)
router.register(r'secciones', SeccionViewSet)
router.register(r'clases', ClaseViewSet)
router.register(r'recuerdos', RecuerdoViewSet)
urlpatterns = [
    path('', include(router.urls)),
]