import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

class DocConsumer(WebsocketConsumer):
    def connect(self):
        self.doc_id = self.scope['url_route']['kwargs']['doc_id']
        self.doc_group_id = 'doc_%s' % self.doc_id

        # Join doc group
        async_to_sync(self.channel_layer.group_add)(
            self.doc_group_id,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave doc group
        async_to_sync(self.channel_layer.group_discard)(
            self.doc_group_id,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send keyword to doc group
        async_to_sync(self.channel_layer.group_send)(
            self.doc_group_id,
            {
                'type': 'send_message',
                'message': message
            }
        )

    def send_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message
        }))
