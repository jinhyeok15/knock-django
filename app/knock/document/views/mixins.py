from ..models import *
from ..exceptions import (
    DocumentDoesNotExistError,
    KeywordDoesNotExistError
)

from django.core.exceptions import ObjectDoesNotExist


class DocumentCRUDMixin:
    def get_document(self, doc_id):
        try:
            return Document.objects.get(pk=doc_id)
        except ObjectDoesNotExist:
            raise DocumentDoesNotExistError
    
    def update_keyword(self, keyword_id, **kwargs):
        try:
            Keyword.objects.get(pk=keyword_id).update(
                **kwargs
            )
        except ObjectDoesNotExist:
            raise KeywordDoesNotExistError


class DocumentValidationMixin:
    pass


class DocumentMixin(
    DocumentCRUDMixin
): pass
