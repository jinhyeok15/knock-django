from django.shortcuts import render
from django.views import View
from django.conf import settings

# api
from rest_framework.views import APIView
from knock.generic.views.response import (
    GenericResponse as Response,
    HttpStatus
)

# mixins
from .mixins import NoteMixin
from knock.generic.views.mixins import GenericMixin

# serializers
from .serializers import (
    NoteSerializer, 
    KeywordCreateSerializer, 
    KeywordSerializer
)

# exception
from knock.generic.exceptions import DjangoValidationError, SerializerValidationError
from ..exceptions import (
    NoteDoesNotExistError,
    KeywordDoesNotExistError
)

# Create your views here.


class NoteIndexView(View):
    # test doc_id=e7002e35-b6bf-46ec-bce5-e5e0c53c151c
    def get(self, request, note_id):
        return render(request, 'note/index.html', {'noteId': note_id})


# use api
class NoteDetail(NoteMixin, GenericMixin, APIView):

    def get(self, request, note_id):
        try:
            obj = self.get_note(note_id)
            serializer = NoteSerializer(obj)
        except NoteDoesNotExistError as e:
            return Response(None, HttpStatus(404, error=e))
        except SerializerValidationError as e:
            return Response(None, HttpStatus(400, error=e))
        else:
            return Response(serializer.data, HttpStatus(200))


class NoteKeyword(GenericMixin, APIView):

    def post(self, request, note_id):
        try:
            serializer = self.get_valid_srz(KeywordCreateSerializer, data=request.data)
            keyword = serializer.save()
        except SerializerValidationError as e:
            return Response(None, HttpStatus(400, error=e))
        else:
            return Response(KeywordSerializer(keyword).data, HttpStatus(200))


class KeywordDetail(NoteMixin, GenericMixin, APIView):
    
    def get(self, request, keyword_id):
        pass
    
    def patch(self, request, keyword_id):
        try:
            self.update_keyword(keyword_id, **request.data)
        except KeywordDoesNotExistError as e:
            return Response(None, HttpStatus(404, error=e))
        else:
            return Response(None, HttpStatus(201, message='????????????'))


def validate_keyword_input(keyword):
    keyword = keyword.replace(' ', '_')
    if len(keyword)>settings.KEYWORD_MAX_LENGTH:
        raise KeywordOutOfLengthError
    import re
    p = re.compile('^[a-zA-Z0-9_???-???]+$')
    m = p.match(keyword)
    if m:
        return keyword
    raise CannotSendKeywordException


class CannotSendKeywordException(DjangoValidationError):
    message = "???????????? ??????(?????? ???????????? ?????? ??????) ?????? ????????? ???????????????"

    def __init__(self):
        super().__init__(self.message)


class KeywordOutOfLengthError(DjangoValidationError):
    message = f"???????????? ????????? ?????????????????? ????????????: {settings.KEYWORD_MAX_LENGTH}"

    def __init__(self):
        super().__init__(self.message)
