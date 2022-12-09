from rest_framework.views import APIView
from rest_framework.views import Response
from api.serializers import AddBlogSerializer, AddContactSerializer, BlogSerializer, CategorySerializer, RecentBlogsSerializer, SingleBlogSerializer, CommentsListByBlogSerializer, AddCommentSerializer
from api.models import Category, Blog, Comment, Contact
from rest_framework.status import HTTP_202_ACCEPTED, HTTP_404_NOT_FOUND
from api.pagination import InitialPage
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated


def DefaultResponse(msg, error):
    if error:
        return {"Status": "Not Ok", "Error": f"{msg}"}

    return {"Status": "Ok", "Message": msg}


class CategoryView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class RecentBlogsView(ListAPIView):
    queryset = Blog.objects.order_by('-created')[:6]
    serializer_class = RecentBlogsSerializer


class AllBlogListView(ListAPIView):
    queryset = Blog.objects.all()
    pagination_class = InitialPage
    serializer_class = BlogSerializer


class BlogSortedByCategoryView(ListAPIView):
    pagination_class = InitialPage
    serializer_class = BlogSerializer

    def get_queryset(self):
        return Blog.objects.all().filter(category=self.kwargs['category'])


class SingleBlogView(RetrieveAPIView):
    queryset = Blog.objects.all()
    serializer_class = SingleBlogSerializer
    lookup_field = 'id_no'


class AddBlogView(CreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = AddBlogSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class BlogEditView(UpdateAPIView, DestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = AddBlogSerializer
    lookup_field = 'id_no'
    permission_classes = [IsAuthenticated]


class AddLikeView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, id_no, format=None):
        try:
            if Blog.objects.filter(id_no=id_no).exists():
                blog = Blog.objects.get(id_no=id_no)
                blog.likeNo = blog.likeNo + 1
                blog.like.add(request.user)

                blog.save()

                return Response(DefaultResponse("You have liked.", False), status=HTTP_202_ACCEPTED)

            return Response(DefaultResponse("This blog does not exist.", True), status=HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response(DefaultResponse(e, True), status=HTTP_404_NOT_FOUND)

    def delete(self, request, id_no, format=None):
        try:
            if Blog.objects.filter(id_no=id_no).exists():
                blog = Blog.objects.get(id_no=id_no)
                blog.likeNo = blog.likeNo - 1
                blog.like.remove(request.user)

                blog.save()

                return Response(DefaultResponse("You have romoved your liked.", False), status=HTTP_202_ACCEPTED)

            return Response(DefaultResponse("This blog does not exist.", True), status=HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response(DefaultResponse(e, True), status=HTTP_404_NOT_FOUND)


class ShowCommentView(ListAPIView):
    pagination_class = InitialPage
    serializer_class = CommentsListByBlogSerializer

    def get_queryset(self):
        return Comment.objects.all().filter(parentBlog=self.kwargs['id_no']).filter(master=None)


class AddCommentView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Comment.objects.all()
    serializer_class = AddCommentSerializer

    def perform_create(self, serializer):
        serializer.save(uploader=self.request.user)


class EditCommentView(UpdateAPIView, DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = AddCommentSerializer
    lookup_field = 'id_no'
    permission_classes = [IsAuthenticated]


class AddContactView(CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = AddContactSerializer
