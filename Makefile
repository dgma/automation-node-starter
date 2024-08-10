SHELL := /bin/bash

.PHONY: init typecheck lint lint-stg test pre-commit pre-push updev watch buildprod upprod cleanprod dev prod encryptprod

all: init typecheck

init: 
	@npm i

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

updev:
	@docker compose up -d && docker compose logs -f

watch:
	@docker compose up -d --watch && docker compose logs -f

buildprod:
	@docker compose -f docker-compose.prod.yml build

upprod:
	@docker compose -f docker-compose.prod.yml up -d && docker compose -f docker-compose.prod.yml logs -f

clearprod: 
	@docker compose -f docker-compose.prod.yml down

# shortcuts for docker

prod:
	npx tsx src

dev:
	npx tsx --watch src

# encryption setup
encryptprod:
	@npx dotenvx encrypt -f conf/.production.secrets.env