SHELL := /bin/bash

.PHONY: init typecheck lint lint.stg test pre-commit pre-push up.dev watch build.prod up.prod clear.prod start.dev start.prod encrypt.prod

all: init typecheck

init: 
	@npm i

typecheck:
	@npx tsc

lint: 
	@npx eslint src/**/*.ts test/**/*.ts

lint.stg: 
	@npx lint-staged

test:
	@npx jest --passWithNoTests

pre-commit: typecheck lint.stg

pre-push: lint typecheck test

# docker aliases

up.dev:
	@docker compose up -d && docker compose logs -f

watch:
	@docker compose up -d --watch && docker compose logs -f

build.prod:
	@docker compose -f docker-compose.prod.yml build

up.prod:
	@docker compose -f docker-compose.prod.yml up -d && docker compose -f docker-compose.prod.yml logs -f

clear.prod: 
	@docker compose -f docker-compose.prod.yml down

# shortcuts for docker

start.prod:
	export NODE_ENV=production && npx tsx src

start.dev:
	export NODE_ENV=development && npx tsx --watch src

start.debug:; export NODE_ENV=development && npx tsx --watch --inspect-brk src

start.debug.open:; export NODE_ENV=development && npx tsx --watch --inspect-brk=0.0.0.0:9229 src

# encryption setup
encrypt.prod:
	@npx dotenvx encrypt -f conf/.production.secrets.env