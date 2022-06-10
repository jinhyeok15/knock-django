import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

class NoteConsumer(WebsocketConsumer):
    def connect(self):
        self.note_id = self.scope['url_route']['kwargs']['note_id']
        self.note_group_id = 'note_%s' % self.note_id

        # Join note group
        async_to_sync(self.channel_layer.group_add)(
            self.note_group_id,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave note group
        async_to_sync(self.channel_layer.group_discard)(
            self.note_group_id,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send keyword to note group
        async_to_sync(self.channel_layer.group_send)(
            self.note_group_id,
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
