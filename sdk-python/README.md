# OmniLogger Python Package

Welcome to the OmniLogger Python Package!

## Table of Contents

- [OmniLogger Python Package](#omnilogger-python-package)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Usage](#usage)
    - [Installing](#installing)
    - [Calling functions](#calling-functions)
    - [Editing the pricing](#editing-the-pricing)
  - [Contributing](#contributing)
    - [Requirement](#requirement)
    - [Getting Started](#getting-started)
    - [Managing Dependencies](#managing-dependencies)
    - [Running Python Files](#running-python-files)
      - [Tip](#tip)
    - [Running Tests](#running-tests)
    - [Running CI locally](#running-ci-locally)
    - [Configuring PyPI User](#configuring-pypi-user)
    - [Publishing to PyPI](#publishing-to-pypi)
  - [Generating prisma types](#generating-prisma-types)
  - [Linting](#linting)

## Introduction

This document will first describe how to use the package, and then provide a step-by-step guide for any developper that might want to help on the project.

## Usage

### Installing

Run the following command to install the package:

```sh
pip install omnilogger
```

### Calling functions

Import the package in your script:

```python
from omnilogger import start_listener
```

Start the listener:

```python
start_listener()
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
send_to_db(log)
```

### Editing the prices

The price of each model will sometimes be updated when we publish a new version of the package to take into account the new pricing used by OpenAI. However, you can also edit the prices yourself to reflect the exact prices that you are paying.

Once you have called the pricing function once (directly or via the listener function), a pricing file will be created in your local storage. You can edit it to change the pricing of the different models. Each operating system has a different path for the local storage:

if you are running on macOS, you should use:
`~/Library/Application Support/omnilogger`

If you are running on Windows (at least English Win) that should be:
`C:\Documents and Settings\<User>\Application Data\Local Settings\theodo_uk\omnilogger`
or possibly:
`C:\Documents and Settings\<User>\Application Data\theodo_uk\omnilogger`

for roaming profiles but that is another story.

On Linux (and other Unices), according to the XDG Basedir Spec, it should be:
`~/.local/share/omnilogger`

## Contributing

### Requirement

Make sure you have Poetry installed on your local machine. If not, follow the instruction on https://python-poetry.org/docs/.

### Getting Started

1. Create venv:

   ```sh
   pyenv install 3.11.3
   poetry env use 3.11.3
   poetry install
   ```

2. Generate prisma types

```sh
poetry run prisma generate --schema ../prisma/schema.prisma --generator client_py
```

### Managing Dependencies

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

### Running CI locally

Run `source local_ci.sh` to run the same CI checks as in the pipeline before pushing your code.

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

## Linting

This project uses:

- [pylint](https://marketplace.visualstudio.com/items?itemName=ms-python.pylint)
- [flake8](https://marketplace.visualstudio.com/items?itemName=ms-python.flake8)
- [black](https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter) for code formatting
- [isort](https://marketplace.visualstudio.com/items?itemName=ms-python.isort) for import sorting

Make sure you have the extensions installed, and for pylint, ensure that the import strategy "fromEnvironment" is used, since it [cannot be configured in .vscode/settings.json at the moment.](https://github.com/microsoft/vscode-pylint/issues/377)
