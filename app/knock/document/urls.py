from django.urls import path
from . import views


urlpatterns = [
    path('<str:doc_id>/', views.index, name='document-index'),
]
