from django.db import models
import uuid

from knock.utils import tokenize

# Create your models here.

class DocumentManager(models.Manager):
    def create(self, keywords, *args, **kwargs):
        if keywords=='':
            keywords = tokenize({'data': []})
        return super().create(keywords, *args, **kwargs)


class Document(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    keywords = models.TextField()  # jwt 사용
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = DocumentManager()

    class Meta:
        db_table = 'document'
