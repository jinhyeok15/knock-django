from ..models import *
from ..exceptions import (
    DocumentDoesNotExistError
)

from django.core.exceptions import ObjectDoesNotExist


class DocumentCRUDMixin:
    def get_document(self, doc_id):
        try:
            return Document.objects.get(pk=doc_id)
        except ObjectDoesNotExist:
            raise DocumentDoesNotExistError


class DocumentValidationMixin:
    pass


class DocumentMixin(
    DocumentCRUDMixin
): pass
