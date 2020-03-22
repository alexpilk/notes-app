# subscriptions/views.py
from .models import Note
from .serializers import NoteSerializer
from rest_framework import generics
from datetime import datetime, timezone


class NoteList(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def filter_queryset(self, queryset):
        return queryset.filter(author=self.request.user.id, expiration_date__gt=datetime.now(timezone.utc))

    def create(self, request, *args, **kwargs):
        request.data['author'] = self.request.user.id
        return super().create(request)


class NoteDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def filter_queryset(self, queryset):
        return queryset.filter(author=self.request.user.id, expiration_date__gt=datetime.now(timezone.utc))
