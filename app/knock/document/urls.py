from django.urls import path, include
from . import views


urlpatterns = [
    # document
    path('document/', include(([
        path('<str:doc_id>/', views.DocumentIndexView.as_view(), name='document-index')
    ], 'document'), namespace='document')),

    # api
    path('api/document/', include(([
        path('<str:doc_id>/', views.DocumentDetail.as_view(), name='api-document-detail'),
        path('<str:doc_id>/keyword/', views.DocumentKeyword.as_view(), name='api-document-keyword'),
        path('<str:doc_id>/keyword/<int:keyword_id>/', views.KeywordDetail.as_view(), name='api-keyword-detail')
    ], 'document'), namespace='api')),
]
