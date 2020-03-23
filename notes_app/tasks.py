from celery import shared_task

from notes_app.models import Note
from notes_app.views import current_datetime


@shared_task
def delete_expired_notes():
    Note.objects.filter(
        expiration_date__lte=current_datetime()
    ).delete()
