# App for storing self-destructing notes

## Stack

### Backend
- Python
- Django
- Django REST Framework
- pytest
- pytest-django
- celery
- postgres
- flake8

### Frontend
- Vue.js
- Bootstrap
- Cypress

### Other
- pip-tools
- Docker
- docker-compose

## Quick start
If you do not have `make` available - just copy commands from the Makefile and run manually.

1. Install Docker and docker-compose
2. Migrate the database: `make migrate`
3. Run the app: `make run`
4. Open http://localhost:8080

## Commands

Generate requirements.txt based on requirements.in:  
`make pip-compile`

Migrate the database:  
`make migrate`

Run backend tests:  
`make test-backend`

Run frontend tests:  
`make test-frontend`

Run frontend tests interactively in Electron (tested on MacOS High Sierra, requires XQuartz):  
`make test-frontend-interactive`

Run app:  
`make run`

## Cypress tests

If GUI redirection from Docker container doesn't work - check out [videos of interactive tests](front/cypress/videos/).

All web requests are mocked. Be sure to run tests with the app running in the background.

![Cypress tests](/images/cypress.png "Cypress tests")

## Expiration handling

### Timezones

Expiration date date picker renders date in client timezone taken from browser.
Backend expects UTC.

### Filtering

When listing notes - notes are filtered by user and expiration date.  
This means that even if there are expired notes in the database they are not going to be returned by the API.

### Celery

Celery task is executed once a minute to delete expired notes from the database.
