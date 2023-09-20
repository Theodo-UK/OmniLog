#!/usr/bin/env bash

poetry run isort omnilogger test --check-only
poetry run flake8
poetry run pylint ./*/**.py --errors-only
poetry run pytest
poetry run python test/openai_api/validate_format.py