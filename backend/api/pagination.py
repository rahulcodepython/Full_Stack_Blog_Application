from rest_framework.pagination import PageNumberPagination


class InitialPage(PageNumberPagination):
    page_size = 5
