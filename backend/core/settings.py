"""
Django settings for core project.
"""

from pathlib import Path
import os
import dj_database_url
import cloudinary
import cloudinary.uploader
import cloudinary.api

# Paths principales
BASE_DIR = Path(__file__).resolve().parent.parent

# Clave secreta de desarrollo
SECRET_KEY = 'django-insecure-)^c$-ynnl5s!qzx(e$04!==3=$#r@6*8ul%5jeve!#u85v&k56'

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'pilares-de-el-monte.onrender.com']

# Aplicaciones instaladas (El orden aquí es obligatorio para Cloudinary)
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'cloudinary_storage',  # <-- Debe ir estrictamente antes de staticfiles
    'django.contrib.staticfiles',
    'cloudinary',          # <-- Requerido por la librería
    'corsheaders',
    'rest_framework',
    'api',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# Configuración de Base de Datos (Neon)
DATABASES = {
    'default': dj_database_url.config(
        default=f"sqlite:///{os.path.join(BASE_DIR, 'db.sqlite3')}",
        conn_max_age=600
    )
}

# Validadores
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',},
]

# Internacionalización
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Archivos Estáticos (CSS, JS)
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Configuración CORS
CORS_ALLOW_ALL_ORIGINS = True

# ==============================================================================
# CONFIGURACIÓN DE CLOUDINARY & ALMACENAMIENTO (COMPATIBLE CON DJANGO 6)
# ==============================================================================

# 1. Credenciales de conexión con tus llaves exactas como respaldo seguro
cloudinary.config(
    cloud_name = os.environ.get('CLOUDINARY_CLOUD_NAME', 'pilaresdeelmonte'),
    api_key = os.environ.get('CLOUDINARY_API_KEY', '347984667758863'),
    api_secret = os.environ.get('CLOUDINARY_API_SECRET', 'W-VXNUoNm2WW3JkymAWnlXJpbQ4')
)

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': os.environ.get('CLOUDINARY_CLOUD_NAME', 'pilaresdeelmonte'),
    'API_KEY': os.environ.get('CLOUDINARY_API_KEY', '347984667758863'),
    'API_SECRET': os.environ.get('CLOUDINARY_API_SECRET', 'W-VXNUoNm2WW3JkymAWnlXJpbQ4')
}

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# 2. Controladores de Almacenamiento oficiales para Django 6 (Modo estándar para evitar caídas)
STORAGES = {
    "default": {
        "BACKEND": "cloudinary_storage.storage.MediaCloudinaryStorage",
    },
    "staticfiles": {
        "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
    },
}

# 3. Solución al error de compatibilidad interna con la recolección estática
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'