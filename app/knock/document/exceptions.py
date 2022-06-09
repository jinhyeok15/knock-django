from knock.generic.exceptions import DjangoValidationError


class DocumentDoesNotExistError(DjangoValidationError):
    '''
    존재하지 않는 문서입니다
    '''
    message = "존재하지 않는 문서입니다"
    code = "DOCUMENT_DOES_NOT_EXIST"

    def __init__(self):
        super().__init__(self.message, code=self.code)

class KeywordDoesNotExistError(DjangoValidationError):
    '''
    존재하지 않는 키워드입니다
    '''
    message = "존재하지 않는 키워드입니다"
    code = "KEYWORD_DOES_NOT_EXIST"

    def __init__(self):
        super().__init__(self.message, code=self.code)
