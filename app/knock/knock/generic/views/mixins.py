from ..exceptions import SerializerValidationError


class GenericValidationMixin:
    def get_valid_srz(self, serializer, data, **kwargs):
        """
        models 쪽 validation은 serializer에서 검증이 들어가 get_valid_szr을 통해 SerializerValidationError로 raise된다.
        serializer.is_valid()로 검증을 해주는 부분에 대한 method
        """
        szr = serializer(data=data, **kwargs)

        if szr.is_valid() is False:
            raise SerializerValidationError(f'Not valid serializer {serializer.__name__}', code='SERIALIZER_BAD_REQUEST', params=szr.errors)
        return szr


class GenericMixin(
    GenericValidationMixin
): pass
