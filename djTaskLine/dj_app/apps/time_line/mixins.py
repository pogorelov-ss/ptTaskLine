# class DetailSerializerMixin(object):
#
#     def get_serializer_class(self):
#         serializer_class = super().get_serializer_class()
#         if self.action == 'retrieve':
#             return self.serializer_detail_class
#         if self.action == 'create' or self.action == 'update' or self.action == 'partial_update':
#             return self.serializer_create_class
#         return serializer_class


class DetailSerializerMixin(object):
    """
    Add custom serializer for detail view
    """
    serializer_detail_class = None
    queryset_detail = None

    def get_serializer_class(self):
        error_message = "'{0}' should include a 'serializer_detail_class' attribute".format(self.__class__.__name__)
        assert self.serializer_detail_class is not None, error_message
        if self._is_request_to_detail_endpoint():
            return self.serializer_detail_class
        else:
            return super(DetailSerializerMixin, self).get_serializer_class()

    def get_queryset(self, *args, **kwargs):
        if self._is_request_to_detail_endpoint() and self.queryset_detail is not None:
            return self.queryset_detail.all()  # todo: test all()
        else:
            return super(DetailSerializerMixin, self).get_queryset(*args, **kwargs)

    def _is_request_to_detail_endpoint(self):
        if hasattr(self, 'lookup_url_kwarg'):
            lookup = self.lookup_url_kwarg or self.lookup_field
        return lookup and lookup in self.kwargs

