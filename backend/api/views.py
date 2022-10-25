from rest_framework.views import APIView
from rest_framework.views import Response
from api.serializers import AddBlogSerializer, AddContactSerializer, BlogSerializer, CategorySerializer, RecentBlogsSerializer, SingleBlogSerializer, CommentsListByBlogSerializer, AddCommentSerializer
from api.models import Category, Blog, Comment, Contact
from rest_framework.status import HTTP_202_ACCEPTED, HTTP_404_NOT_FOUND, HTTP_406_NOT_ACCEPTABLE
from api.pagination import InitialPage
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView, CreateAPIView


def DefaultResponse(msg, error):
    if error:
        return {"Status": "Not Ok", "Error": f"{msg}"}

    return {"Status": "Ok", "Message": msg}


class CategoryView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class RecentBlogsView(ListAPIView):
    queryset = Blog.objects.order_by('-created')[:5]
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

    def get(self, request, *args, **kwargs):
        response = super().get(request, *args, **kwargs)
        user = request.user.id if request.user.is_authenticated else 'Guest'
        response.data['requestedUser'] = user
        return response


class AddBlogView(CreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = AddBlogSerializer


class BlogEditView(UpdateAPIView, DestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = AddBlogSerializer
    lookup_field = 'id_no'


class AddLikeView(APIView):

    def post(self, request, id_no, format=None):
        try:
            if request.user.is_authenticated():
                if Blog.objects.filter(id_no=id_no).exists():
                    blog = Blog.objects.get(id_no=id_no)
                    blog.likeNo = blog.likeNo + 1
                    blog.like.add(request.user)

                    blog.save()

                    return Response(DefaultResponse("You have liked.", False), status=HTTP_202_ACCEPTED)

                return Response(DefaultResponse("This blog does not exist.", True), status=HTTP_404_NOT_FOUND)

            return Response(DefaultResponse("Requested user does not exist.", True), status=HTTP_406_NOT_ACCEPTABLE)

        except Exception as e:
            return Response(DefaultResponse(e, True), status=HTTP_404_NOT_FOUND)

    def delete(self, request, id_no, format=None):
        try:
            if request.user.is_authenticated():
                if Blog.objects.filter(id_no=id_no).exists():
                    blog = Blog.objects.get(id_no=id_no)
                    blog.likeNo = blog.likeNo - 1
                    blog.like.remove(request.user)

                    blog.save()

                    return Response(DefaultResponse("You have romoved your liked.", False), status=HTTP_202_ACCEPTED)

                return Response(DefaultResponse("This blog does not exist.", True), status=HTTP_404_NOT_FOUND)

            return Response(DefaultResponse("Requested user does not exist.", True), status=HTTP_406_NOT_ACCEPTABLE)

        except Exception as e:
            return Response(DefaultResponse(e, True), status=HTTP_404_NOT_FOUND)


class ShowCommentView(ListAPIView):
    pagination_class = InitialPage
    serializer_class = CommentsListByBlogSerializer

    def get_queryset(self):
        return Comment.objects.all().filter(parentBlog=self.kwargs['id_no'])


class AddCommentView(CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = AddCommentSerializer


class EditCommentView(UpdateAPIView, DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = AddCommentSerializer
    lookup_field = 'id_no'


class AddContactView(CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = AddContactSerializer
