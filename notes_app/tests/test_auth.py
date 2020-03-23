import pytest
from rest_framework.test import APIClient

pytestmark = pytest.mark.django_db


@pytest.fixture
def client() -> APIClient:
    return APIClient()


def test_can_register_user(client):
    user = client.post(
        '/api/accounts/register/',
        data={
            'username': 'Alex',
            'password': 'veryStrongPassword',
            'password_confirm': 'veryStrongPassword'
        }).data
    assert user == {
        'id': user['id'],
        'username': 'Alex',
        'first_name': '',
        'last_name': '',
        'email': ''
    }


def test_cannot_register_user_if_passwords_do_not_match(client):
    errors = client.post(
        '/api/accounts/register/',
        data={
            'username': 'Alex',
            'password': 'veryStrongPassword',
            'password_confirm': 'superStrongPassword'
        }).data
    assert errors == {
        'non_field_errors': [
            "Passwords don't match"
        ]
    }


def test_cannot_register_user_if_fields_are_empty(client):
    errors = client.post(
        '/api/accounts/register/',
        data={
            'username': '', 'password': '',
            'password_confirm': ''
        }
    ).data
    assert errors == {
        'username': ['This field may not be blank.'],
        'password': ['This field may not be blank.'],
        'password_confirm': ['This field may not be blank.']}


def test_token_is_created_on_login(client):
    client.post(
        '/api/accounts/register/',
        data={
            'username': 'Alex',
            'password': 'veryStrongPassword',
            'password_confirm': 'veryStrongPassword'
        })
    response = client.post(
        '/api/accounts/login/',
        data={
            'login': 'Alex',
            'password': 'veryStrongPassword'
        }).data
    assert 'token' in response


def test_cannot_login_with_wrong_credentials(client):
    client.post(
        '/api/accounts/register/',
        data={
            'username': 'Alex',
            'password': 'veryStrongPassword',
            'password_confirm': 'veryStrongPassword'
        }
    )
    response = client.post(
        '/api/accounts/login/',
        data={
            'login': 'Alex',
            'password': 'wrongPassword'
        }).data
    assert response == {
        'detail': 'Login or password invalid.'
    }


def test_token_grants_access(client):
    client.post(
        '/api/accounts/register/',
        data={
            'username': 'Alex',
            'password': 'veryStrongPassword',
            'password_confirm': 'veryStrongPassword'
        })
    token = client.post(
        '/api/accounts/login/',
        data={
            'login': 'Alex',
            'password': 'veryStrongPassword'
        }).data['token']
    client.credentials(HTTP_AUTHORIZATION=f'Token {token}')
    notes = client.get('/api/notes/').data
    assert notes == []


def test_unauthorized_user_cannot_access_notes(client):
    notes = client.get('/api/notes/').data
    assert notes == {'detail': 'Authentication credentials were not provided.'}
