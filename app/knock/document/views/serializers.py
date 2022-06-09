from rest_framework.serializers import ModelSerializer, SerializerMethodField

from ..models import Document, Keyword


class DocumentSerializer(ModelSerializer):
    keywords = SerializerMethodField()
    
    class Meta:
        model = Document
        fields = '__all__'

    def get_keywords(self, obj):
        return KeywordSerializer(obj.keywords, many=True).data


class KeywordCreateSerializer(ModelSerializer):
    class Meta:
        model = Keyword
        fields = [
            'document',
            'title',
        ]


class KeywordSerializer(ModelSerializer):
    class Meta:
        model = Keyword
        fields = '__all__'
