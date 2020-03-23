IP := $(ifconfig en0 | grep inet | awk '$1=="inet" {print $2}')

pip-compile:
	docker-compose run --rm pip-tools

migrate:
	docker-compose up -d db && docker-compose run --rm web python manage.py migrate

test-backend:
	docker-compose run --rm web python -m pytest /code/notes_app --flake8

run:
	docker-compose up web front celery celery-beat

test-front-interactive:
	./cypress-interactive.sh

test-front:
	docker-compose run --rm cypress
