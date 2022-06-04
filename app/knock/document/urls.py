from django.urls import path, include
from . import views


urlpatterns = [
    # document
    path('document/', include(([
        path('<str:doc_id>/', views.index, name='document-index')
    ], 'document'), namespace='document')),

    # api
    path('api/document/', include(([
        path('<str:doc_id>/', views.document_detail, name='api-document-detail')
    ], 'document'), namespace='api')),
]
