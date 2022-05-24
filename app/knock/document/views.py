from django.shortcuts import render

# Create your views here.

def index(request):
    if request.GET['keyword-input']:
        # location = generate_location(obj)
        pass
    return render(request, 'document/index.html')
