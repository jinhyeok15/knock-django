from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path('ws/doc/<str:doc_id>/', consumers.DocConsumer.as_asgi()),
]
