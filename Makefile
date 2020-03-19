pip-compile:
	docker-compose run --rm pip-tools

build:
	docker-compose build web

test:
	docker-compose run --rm app python -m pytest /code/ --flake8

run:
	docker-compose up web
