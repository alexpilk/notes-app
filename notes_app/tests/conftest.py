from datetime import datetime, timezone

import pytest
from django.contrib.auth.models import User

from notes_app.models import Note

mock_time = datetime(year=2020, month=4, day=3, hour=10, minute=0, tzinfo=timezone.utc)


@pytest.fixture()
def user():
    return User.objects.create(username='Alex')


@pytest.fixture()
def notes(user):
    note_1 = Note.objects.create(
        name='Note 1',
        author=user,
        text='Just some stuff',
        expiration_date=datetime(year=2020, month=4, day=4, hour=10, minute=0, tzinfo=timezone.utc)
    )
    note_2 = Note.objects.create(
        name='Expired note',
        author=user,
        text='Some more stuff',
        expiration_date=datetime(year=2020, month=4, day=2, hour=10, minute=0, tzinfo=timezone.utc)
    )
    return [note_1, note_2]
