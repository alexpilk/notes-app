from datetime import datetime, timezone

from rest_framework import generics

from .models import Note
from .serializers import NoteSerializer


def current_datetime():
    return datetime.now(timezone.utc)


class NoteList(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def filter_queryset(self, queryset):
        return queryset.filter(
            author=self.request.user.id,
            expiration_date__gt=current_datetime()
        )

    def create(self, request, *args, **kwargs):
        request.data['author'] = self.request.user.id
        return super().create(request)


class NoteDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def filter_queryset(self, queryset):
        return queryset.filter(
            author=self.request.user.id,
            expiration_date__gt=current_datetime()
        )
