# Makefile
install:
	npm ci

test:
	npm test

test-coverage:
	npm run test:coverage

test-watch:
	npm run test:watch

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

.PHONY: install test test-coverage test-watch lint lint-fix

