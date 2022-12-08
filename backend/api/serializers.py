from rest_framework import serializers
from api.models import Blog, Category, Comment, Contact
from user.serializers import CustomUserMinimalDataSerializer, LikedAndCommentPersonDetails


class CommentsChildSerializer(serializers.ModelSerializer):

    uploader = CustomUserMinimalDataSerializer(read_only=True)

    class Meta:
        model = Comment
        exclude = ['parentBlog', 'master']


class CommentsListByBlogSerializer(serializers.ModelSerializer):

    uploader = CustomUserMinimalDataSerializer(read_only=True)
    childComment = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        exclude = ['parentBlog', 'master']

    def get_childComment(self, obj):
        comment = Comment.objects.filter(master=obj.id_no)

        return CommentsChildSerializer(comment, many=True).data


class CategorySerializer(serializers.ModelSerializer):

    totalBlog = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = '__all__'

    def get_totalBlog(self, obj):
        blogCount = Blog.objects.filter(category=obj.name).count()
        return blogCount


class RecentBlogsSerializer(serializers.ModelSerializer):

    author = serializers.StringRelatedField(source='author.name')
    category = serializers.StringRelatedField(source='category.name')
    image = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = ['id_no', 'title', 'image', 'author', 'category']

    def get_image(self, obj):
        if obj.image:
            return obj.image.url


class BlogSerializer(serializers.ModelSerializer):

    author = CustomUserMinimalDataSerializer(read_only=True)
    image = serializers.SerializerMethodField()
    like = LikedAndCommentPersonDetails(many=True, read_only=True)

    class Meta:
        model = Blog
        exclude = ['content', 'slug', 'seo_tags']

    def get_image(self, obj):
        if obj.image:
            return obj.image.url


class SingleBlogSerializer(serializers.ModelSerializer):

    author = CustomUserMinimalDataSerializer(read_only=True)
    image = serializers.SerializerMethodField()
    like = LikedAndCommentPersonDetails(many=True, read_only=True)

    class Meta:
        model = Blog
        exclude = ['slug']

    def get_image(self, obj):
        if obj.image:
            return obj.image.url


class AddBlogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Blog
        fields = '__all__'


class AddCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'


class AddContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact
        fields = '__all__'
