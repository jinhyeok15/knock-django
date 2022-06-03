from django.shortcuts import render, redirect, get_object_or_404
from .models import Document

from django.conf import settings

# exception
from django.core.exceptions import ValidationError

# serializer
from django.core.serializers import serialize

import json
import jwt

# Create your views here.

def index(request, doc_id):
    # test doc_id=f0a84bfe-7b85-4479-b11f-4a5292500473
    context = {
        'doc_id': doc_id,
        'keyword_list': [],
        'keywords': ''
    }
    obj = get_object_or_404(Document, pk=doc_id)
    
    if obj.keywords:
        context['keyword_list'] = list(map(lambda token: json.dumps(jwt.decode(token, '', algorithms=['HS256'])), obj.keywords.split(' ')))
        context['keywords'] = '||'.join(context['keyword_list'])

    if request.method=='POST':
        keywords = request.POST.get('keywords')
        update_document(doc_id, keywords)
        return redirect('document-index', doc_id=doc_id)
    return render(request, 'document/index.html', context)


def update_document(doc_id, keywords):
    if keywords:
        keywords = ' '.join(map(lambda d: jwt.encode(json.loads(d), '', algorithm='HS256'), keywords.split('||')))
        doc = Document.objects.get(pk=doc_id)
        doc.keywords = keywords
        doc.save()


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
