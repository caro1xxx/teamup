from pathlib import Path
import datetime
BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = 'django-insecure-p4ng)wb9z1vcnsfo_peau-3#+xed$+0gr1r8#8@6+nmj0e@fw-'

DEBUG = True

ALLOWED_HOSTS = ['*']


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'main',
    'rest_framework',
    'channels',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # 跨域访问
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'main.middlewares.authentication.CheckAccessToken'
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


WSGI_APPLICATION = 'backend.wsgi.application'

ASGI_APPLICATION = 'backend.asgi.application'

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("127.0.0.1", 6379)],
        },
    },
}


# jwt
JWT_SECRET_KEY = 'teampjwtkey'
JWT_ALGORITHM = 'HS256'
JWT_EXPIRATION_DELTA = 259200

# 数据库
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'teamup',
        'USER': 'teamup',
        'PASSWORD': '4896qwer',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# 时区
LANGUAGE_CODE = 'zh-hans'
TIME_ZONE = 'Asia/Shanghai'
USE_I18N = True
USE_TZ = True


# 静态资源
STATIC_URL = 'static/'

# 大文件
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# 邮件
# 设置邮件域名 发送邮件服务器：smtp.qq.com
EMAIL_HOST = 'smtp.qq.com'
# 设置端口号，为数字  使用SSL，端口号465或587
EMAIL_PORT = 25
# 设置发件人邮箱
EMAIL_HOST_USER = 'wakeups@qq.com'
# 设置发件人授权码
EMAIL_HOST_PASSWORD = 'tsxwwpxunwiaechh'
# 设置是否启用安全连接
EMAIL_USER_TLS = True


# redis
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",		# 使用django-redis的缓存
        "LOCATION": "redis://127.0.0.1:6379/0",			# redis数据库的位置
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "CONNECTION_POOL_KWARGS": {"max_connections": 10000},
            "DECODE_RESPONSES": True,
            "PASSWORD": "",
            'MAX_ENTRIES': 10000,
            'CULL_FREQUENCY': 3,
            'TIMEOUT': 7200,
        }
    }
}


# celery
CELERY_BROKER_URL = "redis://127.0.0.1:6379/0"
CELERY_ACCEPT_CONTENT = ['application/json', ]
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_RESULT_EXPIRES = 1
