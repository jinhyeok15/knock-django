from pydantic import BaseModel
from knock.nosql import (
    object_default, 
    time_id, 
    ChoiceFieldType,
    ObjectFieldType
)


class Keyword(BaseModel):
    id: str = time_id()
    doc_id: str
    title: str
    left: int = 0
    top: int = 0
    contents: ObjectFieldType('contents') = object_default('contents', many=True)
    link_to: list = []


class Content(BaseModel):
    id: str = time_id()
    keyword_id: str
    content_type: ChoiceFieldType(
        ['link', 'video', 'text']
    )
    detail: str
