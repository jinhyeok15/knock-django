from django.urls import path, include
from . import views


urlpatterns = [
    # note
    path('note/', include(([
        path('<str:note_id>/', views.NoteIndexView.as_view(), name='note-index')
    ], 'note'), namespace='note')),

    # api
    path('api/note/', include(([
        path('<str:note_id>/', views.NoteDetail.as_view(), name='api-note-detail'),
        path('<str:note_id>/keyword/', views.NoteKeyword.as_view(), name='api-note-keyword'),
        path('<str:note_id>/keyword/<int:keyword_id>/', views.KeywordDetail.as_view(), name='api-keyword-detail')
    ], 'note'), namespace='api')),
]
