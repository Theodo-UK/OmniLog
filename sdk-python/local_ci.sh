poetry run isort omnilogger test --check-only
poetry run flake8
poetry run pylint */**.py --errors-only
poetry run pytest