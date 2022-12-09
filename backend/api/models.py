from django.db import models
from user.models import CustomUser
from django.utils.text import slugify


class Category(models.Model):
    idName = models.CharField(max_length=50, primary_key=True, unique=True)
    name = models.CharField(max_length=50, default="")

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'


class Blog(models.Model):
    id_no = models.AutoField(primary_key=True, unique=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    author = models.ForeignKey(
        CustomUser, on_delete=models.SET_DEFAULT, default=None, related_name='Author', null=True)
    image = models.ImageField(
        upload_to='blogImage/', blank=True, null=True, default='blogImage/default.png')
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, related_name='BlogCategory', null=True)
    content = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True, default="")
    slug = models.SlugField(
        max_length=100, unique=False, blank=True, null=True)
    likeNo = models.IntegerField(default=0)
    like = models.ManyToManyField(
        CustomUser, related_name='Likes', blank=True)
    commentNo = models.IntegerField(default=0)
    created = models.DateField(auto_now_add=True)
    seo_tags = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        verbose_name = 'Blog'
        verbose_name_plural = 'Blogs'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        return super().save(*args, **kwargs)


class Comment(models.Model):
    id_no = models.AutoField(primary_key=True, unique=True)
    master = models.ForeignKey(
        "self", on_delete=models.CASCADE, related_name="+", null=True, blank=True)
    uploader = models.ForeignKey(
        CustomUser, on_delete=models.SET_DEFAULT, default=None, null=True)
    parentBlog = models.ForeignKey(
        Blog, on_delete=models.CASCADE)
    comment = models.TextField()
    created = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name = 'Comment'
        verbose_name_plural = 'Comments'

    def save(self, *args, **kwargs):
        if self.id_no is None:
            blog = Blog.objects.get(id_no=self.parentBlog.id_no)
            blog.commentNo += 1
            blog.save()
        return super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        blog = Blog.objects.get(id_no=self.parentBlog.id_no)
        blog.commentNo -= 1
        blog.save()
        return super(*args, **kwargs).delete()


class Contact(models.Model):
    id_no = models.AutoField(primary_key=True, unique=True)
    email = models.EmailField()
    name = models.CharField(max_length=1000)
    subject = models.CharField(max_length=1000)
    description = models.TextField()
