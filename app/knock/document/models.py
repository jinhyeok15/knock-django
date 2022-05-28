from django.db import models
import uuid

# Create your models here.

class Document(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    keywords = models.TextField(default='', blank=True)
    class Meta:
        db_table = 'document'
