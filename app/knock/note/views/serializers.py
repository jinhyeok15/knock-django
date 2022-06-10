from rest_framework.serializers import ModelSerializer, SerializerMethodField

from ..models import Note, Keyword


class NoteSerializer(ModelSerializer):
    keywords = SerializerMethodField()
    
    class Meta:
        model = Note
        fields = '__all__'

    def get_keywords(self, obj):
        return KeywordSerializer(obj.keywords, many=True).data


class KeywordCreateSerializer(ModelSerializer):
    class Meta:
        model = Keyword
        fields = [
            'note',
            'title',
        ]


class KeywordSerializer(ModelSerializer):
    class Meta:
        model = Keyword
        fields = '__all__'
