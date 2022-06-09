from django.shortcuts import render
from django.views import View
from django.conf import settings

# api
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# mixins
from .mixins import DocumentMixin
from knock.generic.views.mixins import GenericMixin

# serializers
from .serializers import (
    DocumentSerializer, 
    KeywordCreateSerializer, 
    KeywordSerializer
)

# exception
from django.core.exceptions import ValidationError
from knock.generic.exceptions import SerializerValidationError
from ..exceptions import (
    DocumentDoesNotExistError,
)

# Create your views here.


class DocumentIndexView(View):
    # test doc_id=e7002e35-b6bf-46ec-bce5-e5e0c53c151c
    def get(self, request, doc_id):
        return render(request, 'document/index.html', {'docId': doc_id})


# use api
class DocumentDetail(DocumentMixin, GenericMixin, APIView):

    def get(self, request, doc_id):
        try:
            obj = self.get_document(doc_id)
            serializer = DocumentSerializer(obj)
        except DocumentDoesNotExistError as e:
            return Response({
                    'code': 404,
                    'status': e.message
                }, status=status.HTTP_404_NOT_FOUND)
        except SerializerValidationError as e:
            return Response({
                    'code': 400,
                    'status': e.message,
                    'params': e.params
                }, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({
            'code': 200, 
            'status': 'OK',
            'data': serializer.data}, status=status.HTTP_200_OK)


class DocumentKeyword(GenericMixin, APIView):

    def post(self, request, doc_id):
        try:
            serializer = self.get_valid_srz(KeywordCreateSerializer, data=request.data)
            keyword = serializer.save()
        except SerializerValidationError as e:
            return Response({
                'code': 400,
                'status': e.message,
                'params': e.params
            }, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({
                'code': 200,
                'status': 'OK',
                'data': KeywordSerializer(keyword).data
            }, status=status.HTTP_200_OK)


class KeywordDetail(DocumentMixin, GenericMixin, APIView):
    
    def get(self, request, keywordId):
        pass


def validate_keyword_input(keyword):
    keyword = keyword.replace(' ', '_')
    if len(keyword)>settings.KEYWORD_MAX_LENGTH:
        raise KeywordOutOfLengthError
    import re
    p = re.compile('^[a-zA-Z0-9_가-힣]+$')
    m = p.match(keyword)
    if m:
        return keyword
    raise CannotSendKeywordException


class CannotSendKeywordException(ValidationError):
    message = "키워드는 문자(영어 대소문자 혹은 한글) 혹은 숫자만 가능합니다"

    def __init__(self):
        super().__init__(self.message)


class KeywordOutOfLengthError(ValidationError):
    message = f"키워드의 길이가 초과했습니다 최대길이: {settings.KEYWORD_MAX_LENGTH}"

    def __init__(self):
        super().__init__(self.message)
