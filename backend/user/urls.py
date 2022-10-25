from django.urls import path
from user import views

urlpatterns = [
    path('getdata/', views.UserInitialDataView.as_view()),
    path('edituser/', views.EditUserView.as_view()),
    path('addnewuser/', views.AddNewUserView.as_view())
]
