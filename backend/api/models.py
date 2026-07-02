from django.db import models

class Cepa(models.Model):
    nombre = models.CharField(max_length=100, help_text="Ej: Cabernet Sauvignon, Carmenere, Ensamblaje")
    
    def __str__(self):
        return self.nombre

class Vino(models.Model):
    nombre = models.CharField(max_length=200, help_text="Ej: Pilares del Monte Gran Reserva")
    cepa = models.ForeignKey(Cepa, related_name='vinos', on_delete=models.SET_NULL, null=True)
    cosecha = models.IntegerField(help_text="Año de la cosecha, ej: 2022")
    descripcion = models.TextField(help_text="Notas de cata, maridaje, etc.")
    precio = models.IntegerField(help_text="Precio en pesos chilenos")
    stock = models.IntegerField(default=0)
    imagen = models.ImageField(upload_to='vinos/', null=True, blank=True)
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} - {self.cepa} ({self.cosecha})"
    
class Seccion(models.Model):
    identificador = models.CharField(max_length=50, unique=True, help_text="Escribe aquí la palabra clave en minúsculas. Ej: historia, clases, proceso")
    titulo = models.CharField(max_length=200, help_text="El título que verá el usuario en la página")
    contenido = models.TextField(help_text="El texto principal de esta sección")
    imagen_fondo = models.ImageField(upload_to='secciones/', null=True, blank=True, help_text="Imagen opcional para acompañar el texto")
    actualizado_en = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Sección: {self.identificador} ({self.titulo})"
    
class Clase(models.Model):
    tipo = models.CharField(max_length=100, help_text="Ej: Taller y Degustación, Masterclass")
    titulo = models.CharField(max_length=200, help_text="Ej: Cata de Vinos Reserva")
    fecha = models.CharField(max_length=100, help_text="Ej: Sábado, 24 de Junio")
    hora = models.CharField(max_length=100, help_text="Ej: 16:00 – 18:00 hrs")
    lugar = models.CharField(max_length=100, help_text="Ej: Cava Principal")
    nivel = models.CharField(max_length=50, blank=True, null=True, help_text="Ej: Principiantes")
    descripcion = models.TextField()
    color = models.CharField(max_length=20, default="#4a1220", help_text="Ej: #4a1220 (rojo) o #d4a017 (dorado)")

    def __str__(self):
        return f"{self.tipo}: {self.titulo}"