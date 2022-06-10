from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path('ws/note/<str:note_id>/', consumers.NoteConsumer.as_asgi()),
]
