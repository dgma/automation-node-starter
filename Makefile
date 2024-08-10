SHELL := /bin/bash

.PHONY: init typecheck lint lint-stg test pre-commit pre-push builddev updev watch stopdev cleandev buildprod upprod cleanprod dev prod

all: init typecheck test

init: 
	@npm i --legacy-peer-deps

typecheck: 
	@npx tsc --project tsconfig.json

lint: 
	@npx eslint src/**/*.ts

lint-stg: 
	@npx lint-staged

test:
	@npx jest --passWithNoTests

pre-commit: typecheck lint-stg

pre-push: lint typecheck test

# docker aliases

builddev:
	@docker compose build

updev:
	@docker compose up -d && docker compose logs -f

watch:
	@docker compose up -d --watch && docker compose logs -f

stopdev: 
	@docker compose stop

cleandev: 
	@docker compose down

buildprod:
	@docker compose -f docker-compose.prod.yml build

upprod:
	@docker compose -f docker-compose.prod.yml up -d && docker compose logs -f

cleanprod: 
	@docker compose -f docker-compose.prod.yml down

# shortcuts for docker
prod :
	@npx tsx src

dev:
	@npx dotenvx run -- tsx --watch src