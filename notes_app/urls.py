from django.urls import path, include

from notes_app import views

urlpatterns = [
    path('notes/', views.NoteList.as_view()),
    path('notes/<int:pk>/', views.NoteDetail.as_view()),
    path('accounts/', include('rest_registration.api.urls')),
]
