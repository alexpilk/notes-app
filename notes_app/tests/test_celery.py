from unittest.mock import patch

import pytest

from notes_app.models import Note
from notes_app.tasks import delete_expired_notes
from .conftest import mock_time

pytestmark = pytest.mark.django_db


@patch('notes_app.tasks.current_datetime', lambda: mock_time)
def test_delete_expired_notes(notes):
    assert len(Note.objects.all()) == 2
    delete_expired_notes()
    assert len(Note.objects.all()) == 1
