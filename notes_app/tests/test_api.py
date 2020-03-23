from unittest.mock import patch

import pytest
from rest_framework.test import APIClient

from .conftest import mock_time

pytestmark = pytest.mark.django_db


@pytest.fixture
def client(user) -> APIClient:
    client = APIClient()
    client.force_authenticate(user=user)
    return client


@patch('notes_app.views.current_datetime', lambda: mock_time)
def test_only_valid_notes_are_displayed(client, notes):
    filtered_notes = client.get('/api/notes/').data

    assert filtered_notes == [
        {
            'id': notes[0].id,
            'name': 'Note 1',
            'author': 1,
            'expiration_date': '2020-04-04T10:00:00Z',
            'created_at': filtered_notes[0]['created_at'],
            'text': 'Just some stuff'
        }
    ]


@patch('notes_app.views.current_datetime', lambda: mock_time)
def test_can_save_note(client, user):
    note = {
        'name': 'Note 1',
        'expiration_date': '2020-04-04T10:00:00Z',
        'text': 'Just some stuff'
    }

    created_note = client.post('/api/notes/', note, format='json').data
    fetched_note = client.get(f'/api/notes/{created_note["id"]}/').data
    assert fetched_note == {
        'id': created_note['id'],
        'name': 'Note 1',
        'author': user.id,
        'expiration_date': '2020-04-04T10:00:00Z',
        'created_at': created_note['created_at'],
        'text': 'Just some stuff'
    }


@patch('notes_app.views.current_datetime', lambda: mock_time)
def test_cannot_create_expired_note(client):
    note = {
        'name': 'Note 1',
        'expiration_date': '1999-04-04T10:00:00Z',
        'text': 'Just some stuff'
    }
    error = client.post('/api/notes/', note, format='json').data
    assert error == {
        'expiration_date': [
            'The date cannot be in the past!'
        ]
    }


@patch('notes_app.views.current_datetime', lambda: mock_time)
def test_can_delete_note(client, notes):
    filtered_notes = client.get('/api/notes/').data

    assert len(filtered_notes) == 1

    client.delete(f'/api/notes/{notes[0].id}/')
    filtered_notes = client.get('/api/notes/').data

    assert filtered_notes == []
