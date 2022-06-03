from django.db import models
import uuid
from django.conf import settings

# Create your models here.

class Document(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    keywords = models.TextField(default='')  # jwt 사용
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'document'
