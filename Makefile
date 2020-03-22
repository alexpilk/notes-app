IP := $(ifconfig en0 | grep inet | awk '$1=="inet" {print $2}')

pip-compile:
	docker-compose run --rm pip-tools

build:
	docker-compose build web

test:
	docker-compose run --rm app python -m pytest /code/ --flake8

run:
	docker-compose up web

test-front-interactive:
	./cypress-interactive.sh

test-front:
	docker-compose run --rm cypress
