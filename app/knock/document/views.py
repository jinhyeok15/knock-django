from django.shortcuts import render, redirect, get_object_or_404
from django.utils.datastructures import MultiValueDictKeyError
from .models import Document

# Create your views here.

def index(request, doc_id):
    # test doc_id=f0a84bfe-7b85-4479-b11f-4a5292500473
    obj = get_object_or_404(Document, pk=doc_id)
    keyword_list = obj.keywords.split(' ')
    print(keyword_list)
    keyword_input = request.GET.get('keyword_input', None)
    if keyword_input is not None:
        # location = generate_location(obj)
        return redirect('document-index', doc_id=doc_id)

    return render(request, 'document/index.html', {'doc_id': doc_id})
