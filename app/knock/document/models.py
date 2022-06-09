from django.db import models
import uuid
from django.conf import settings

# Create your models here.


class Document(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'document'


class Keyword(models.Model):
    id = models.AutoField(primary_key=True)
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='keywords')
    title = models.CharField(max_length=settings.KEYWORD_MAX_LENGTH)
    left = models.IntegerField(default=0)
    top = models.IntegerField(default=0)

    class Meta:
        db_table = 'keyword'


class KeywordLink(models.Model):
    id = models.AutoField(primary_key=True)
    from_keyword = models.ForeignKey(Keyword, on_delete=models.CASCADE, related_name='links')
    to_keyword = models.UUIDField()
