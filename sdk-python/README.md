# OmniLog Python Package

Welcome to the OmniLog Python Package! This document provides a step-by-step guide to get you started with setting up, managing dependencies, running tests, and publishing the package to PyPI using Poetry.

## Table of Contents

- [Requirement](#requirement)
- [Managing Dependencies](#managing-dependencies)
- [Running Tests](#running-tests)
- [Configuring PyPI User](#configuring-pypi-user)
- [Publishing to PyPI](#publishing-to-pypi)

## Requirement

Make sure you have Poetry installed on your local machine. If not, follow the instruction on https://python-poetry.org/docs/.

## Managing Dependencies

1. Adding Dependencies: Add any new project dependencies to [tool.poetry.dependencies] using:
   ```sh
   poetry add <package>
   ```
2. Development Dependencies: For development dependencies, add them to the group [tool.poetry.dev.dependencies] using:

   ```sh
   poetry add <dev-package> --group dev
   ```

3. Install Dependencies: Run the following command to install project dependencies:
   ```sh
   poetry install
   ```

## Running Python Files

1. Activate Virtual Environment: The virtual environment ensures that the correct dependencies are available to your script.To activate it, run the command:

   ```sh
   poetry shell
   ```

2. Running Scripts: Once the environment is up, you can run:
   ```sh
   poetry run python <filepath>
   ```

### Tip

To avoid having to type poetry run every time you want to run a script, you can use the poetry run command once at the beginning of your terminal session. This sets up an environment where all subsequent python commands are run within the Poetry virtual environment.

```sh
poetry run
```

Now you can simply use `python path/to/your/script.py` without the need for poetry run each time.

## Running Tests

1. Running Tests: Use the following command to run pytest:

   ```sh
   poetry run pytest
   ```

2. Writing Tests: Create test files in the test directory, e.g., test/send_to_db.test.py, and write your tests using pytest.

## Configuring PyPI User

Configure the PyPI user credentials using the following command (Replace <YOUR_PYPI_TOKEN> with the actual PyPI token):

```sh
poetry config pypi-token.pypi <YOUR_PYPI_TOKEN>
```

## Publishing to PyPI

1. Building: Use the following command to build the package:

   ```sh
   poetry build
   ```

2. Publishing: Publish the package to PyPI using:
   ```sh
   poetry publish
   ```
   tip: Add the --build flag to do both steps at once.
