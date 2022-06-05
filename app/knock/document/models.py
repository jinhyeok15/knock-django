from django.db import models
import uuid

from knock.nosql import object_default
from knock.utils import parse_token, tokenize
# Create your models here.

class DocumentManager(models.Manager):
    def create(self, *args, keywords='', **kwargs):
        if keywords=='':
            keywords = object_default('keywords', many=True)
        return super().create(*args, keywords=keywords, **kwargs)


class Document(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    keywords = models.TextField()  # jwt 사용
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = DocumentManager()

    class Meta:
        db_table = 'document'
    
    def decode_keywords(self):
        return parse_token(self.keywords)
    
    def update_keywords(self, json_data):
        self.keywords = tokenize(json_data)
        self.save()
    
    def create_keyword(self, keyword_data):
        keyword_list = self.decode_keywords()['keywords']
        keyword_list.append(keyword_data)
        data = {'keywords': keyword_list}
        self.update_keywords(data)
        return keyword_data
