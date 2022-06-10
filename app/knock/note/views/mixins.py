from ..models import *
from ..exceptions import (
    NoteDoesNotExistError,
    KeywordDoesNotExistError
)

from django.core.exceptions import ObjectDoesNotExist


class NoteCRUDMixin:
    def get_note(self, note_id):
        try:
            return Note.objects.get(pk=note_id)
        except ObjectDoesNotExist:
            raise NoteDoesNotExistError
    
    def update_keyword(self, keyword_id, **kwargs):
        try:
            Keyword.objects.get(pk=keyword_id).update(
                **kwargs
            )
        except ObjectDoesNotExist:
            raise KeywordDoesNotExistError


class NoteValidationMixin:
    pass


class NoteMixin(
    NoteCRUDMixin
): pass
