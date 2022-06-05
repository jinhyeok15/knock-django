from .utils import tokenize
import time
from typing import List, Any


def object_default(object_name, many=False):
    if many:
        default=[]
    else:
        default=''
    return tokenize({
        object_name: default
    })


def time_id():
    return str(int(time.time()*1000))


class ChoiceFieldType:
    def __new__(cls, choices: List[Any], type=str):
        return type


class ObjectFieldType:
    def __new__(cls, object_name: str, type=str):
        return type
