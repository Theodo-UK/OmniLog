### Getting started
1. Enter env variables in example.env and rename to .env
2. Create and start venv (see instructions below)
3. From venv, run `python3 main.py`

### Virtual Environment for Local Dev
Make sure virtual environment is created
1. Create virtual environment in root directory: `python3 -m venv .venv_llm-ops`
2. Activate virtual environment:

    // On Windows Command Shell, run:
    `.venv_llm-ops\Scripts\activate.bat`

    // On Windows Power Shell, run:
    `.venv_llm-ops\Scripts\activate.ps1`

    // On Unix or MacOS, run:
    `source .venv_llm-ops/bin/activate`

3. Update pip to install packages: `pip install --upgrade pip`
4. Install required packages: `pip install -r requirements.txt`
5. After dev, you should update requirements.txt:
   - `pip freeze > requirements.txt`
   - WARNING: this prevents any additional packages from being installed in venv, only run this command after finishing dev
   - To start installing packages in venv again, delete .venv folder and restart process

### Running .py files
1. While in venv, run `export PYTHONPATH='.'`
   - Helps to fix: `ModuleNotFoundError: No module named 'lib'`
   - If not, check that scripts and folders do not have the same name
2. Run `python3 path/to/file`

### Testing local prisma server
while in `sdk-python`:
1. run `prisma db push`
2. run `prisma generate`
3. run `python3 prisma/example.py`