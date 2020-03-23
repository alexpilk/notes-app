from datetime import datetime, timezone

from rest_framework import serializers

from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = (
            'id', 'name', 'author', 'expiration_date',
            'created_at', 'text'
        )

    @staticmethod
    def validate_expiration_date(expiration_date):
        if expiration_date < datetime.now(timezone.utc):
            raise serializers.ValidationError(
                "The date cannot be in the past!"
            )
        return expiration_date
