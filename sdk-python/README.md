# OmniLogger Python Package

Welcome to the OmniLogger Python Package!

## Table of Contents

- [OmniLog Python Package](#omnilog-python-package)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Usage](#usage)
  - [Contributing](#contributing)
    - [Requirement](#requirement)
    - [Managing Dependencies](#managing-dependencies)
    - [Running Tests](#running-tests)
    - [Configuring PyPI User](#configuring-pypi-user)
    - [Publishing to PyPI](#publishing-to-pypi)

## Introduction

This document will first describe how to use the package, and then provide a step-by-step guide for any developper that might want to help on the project.

## Usage

Run the following command to install the package:

```sh
pip install omnilogger
```

Import the package in your script:

```python
from omnilogger import start_listener
```

Start the listener:

```python
start_listener(database_url)
```

The listener will start listening to your logs to send those concerning openai to the database!

You can also use the logger to log your own messages:

```python
from omnilogger import send_to_db
log = {
   "input": "What is a prompt?",
   "output": "A prompt is a sentence that you give to the model to generate a text.",
   "datetime_utc": "2021-08-31 14:00:00.00",
   "total_tokens": 100,
}
send_to_db(database_url, log)
```

## Contributing

##3 Requirement

Make sure you have Poetry installed on your local machine. If not, follow the instruction on https://python-poetry.org/docs/.

### Managing Dependencies

1. Adding Dependencies: Add any new project dependencies to [tool.poetry.dependencies] using:
   ```sh
   poetry add <package>
   ```
2. Developmnt Dependencies: For development dependencies, add them to the group [tool.poetry.dev.dependencies] using:

   ```sh
   poetry add <dev-package> --group dev
   ```

3. Install Dependencies: Run the following command to install project dependencies:
   ```sh
   poetry install
   ```

### Running Python Files

1. Activate Virtual Environment: The virtual environment ensures that the correct dependencies are available to your script.To activate it, run the command:

   ```sh
   poetry shell
   ```

2. Running Scripts: Once the environment is up, you can run:
   ```sh
   poetry run python <filepath>
   ```

#### Tip

To avoid having to type poetry run every time you want to run a script, you can use the poetry run command once at the beginning of your terminal session. This sets up an environment where all subsequent python commands are run within the Poetry virtual environment.

```sh
poetry run
```

Now you can simply use `python path/to/your/script.py` without the need for poetry run each time.

### Running Tests

1. Running Tests: Use the following command to run pytest:

   ```sh
   poetry run pytest
   ```

2. Writing Tests: Create test files in the test directory, e.g., test/send_to_db.test.py, and write your tests using pytest.

### Configuring PyPI User

Configure the PyPI user credentials using the following command (Replace <YOUR_PYPI_TOKEN> with the actual PyPI token):

```sh
poetry config pypi-token.pypi <YOUR_PYPI_TOKEN>
```

### Publishing to PyPI

1. Building: Use the following command to build the package:

   ```sh
   poetry build
   ```

2. Publishing: Publish the package to PyPI using:
   ```sh
   poetry publish
   ```
   tip: Add the --build flag to do both steps at once.
