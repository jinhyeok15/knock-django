from django.shortcuts import render, get_object_or_404
from .models import Document
from django.conf import settings

# api
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

# serializers
from .serializers import DocumentSerializer, KeywordCreateSerializer, KeywordSerializer

# exception
from django.core.exceptions import ValidationError

# Create your views here.


def index(request, doc_id):
    # test doc_id=e7002e35-b6bf-46ec-bce5-e5e0c53c151c
    obj = get_object_or_404(Document, pk=doc_id)
    context = {
        'obj': obj,
    }
    return render(request, 'document/index.html', context)


# use api
def get_data(request):
    return json.loads(request.body.decode('utf-8'))


@csrf_exempt
def document_detail(request, doc_id):
    try:
        obj = Document.objects.get(pk=doc_id)
    except Document.DoesNotExist:
        return JsonResponse({'code': 404})

    serializer = DocumentSerializer(obj)

    if request.method == 'GET':
        return JsonResponse({'code': 200, 'status': 'OK', 'data': serializer.data})


@csrf_exempt
def document_keyword(request, doc_id):
    request_data = get_data(request)
    serializer = KeywordCreateSerializer(data=request_data)

    if request.method == 'POST':
        if not serializer.is_valid():
            return JsonResponse({
                'code': 400,
                'status': 'BAD_REQUEST',
            })
        keyword = serializer.save()
        return JsonResponse({
            'code': 200,
            'status': 'OK',
            'data': KeywordSerializer(keyword).data
        })


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
