from django.shortcuts import render, redirect
from django.utils.datastructures import MultiValueDictKeyError

# Create your views here.

def index(request):
    try:
        keyword_input = request.GET['keyword-input']
        if keyword_input:
            # location = generate_location(obj)
            return redirect('document-index')
    except MultiValueDictKeyError as e:
        pass

    return render(request, 'document/index.html')
