from .base import *

DEBUG = True
ALLOWED_HOSTS = ['*']
INSTALLED_APPS += ['django_extensions', ]

if DEBUG:
    ##################################################################
    # uwsgi autoreload
    ##################################################################
    try:
        import uwsgi
        from uwsgidecorators import timer
        from django.utils import autoreload

        @timer(3)
        def change_code_gracefull_reload(sig):
            if autoreload.code_changed():
                uwsgi.reload()
    except Exception as error:
        print('we are under django dev server ? no uwsgi ', error)
