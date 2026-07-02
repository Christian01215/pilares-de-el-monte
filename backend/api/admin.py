from django.contrib import admin
from .models import Vino, Cepa, Seccion, Clase

@admin.register(Cepa)
class CepaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre')

@admin.register(Vino)
class VinoAdmin(admin.ModelAdmin):
    # Las columnas que verás en la tabla principal
    list_display = ('nombre', 'cepa', 'cosecha', 'precio', 'stock')
    
    # Agrega un panel lateral para filtrar por estos campos
    list_filter = ('cepa', 'cosecha')
    
    # Agrega una barra de búsqueda superior
    search_fields = ('nombre', 'descripcion')

@admin.register(Seccion)
class SeccionAdmin(admin.ModelAdmin):
    list_display = ('identificador', 'titulo', 'actualizado_en')
    search_fields = ('identificador', 'titulo', 'contenido')

@admin.register(Clase)
class ClaseAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'tipo', 'fecha', 'hora', 'lugar')
    search_fields = ('titulo', 'tipo', 'descripcion')