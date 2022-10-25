from django.urls import path
from api import views

urlpatterns = [
    path('category/', views.CategoryView.as_view()),

    path('recentblogs/', views.RecentBlogsView.as_view()),
    path('blogs/', views.AllBlogListView.as_view()),
    path('blogs/<str:category>/', views.BlogSortedByCategoryView.as_view()),

    path('blog/<int:id_no>/', views.SingleBlogView.as_view()),
    path('addblog/', views.AddBlogView.as_view()),
    path('editblog/<int:id_no>/', views.BlogEditView.as_view()),

    path('addlike/<int:id_no>/', views.AddLikeView.as_view()),
    path('comments/<int:id_no>/', views.ShowCommentView.as_view()),
    path('addcomment/', views.AddCommentView.as_view()),
    path('editcomment/<int:id_no>/', views.EditCommentView.as_view()),

    path('addcontact/', views.AddContactView.as_view()),
]
