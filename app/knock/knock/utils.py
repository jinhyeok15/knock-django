import jwt

from . import settings

SECRET = settings.SECRET_KEY


def parse_token(token):
    return jwt.decode(token, SECRET, algorithms=['HS256'])


def tokenize(data):
    return jwt.encode(data, SECRET, algorithm='HS256')
