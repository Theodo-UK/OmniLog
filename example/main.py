import os
from dotenv import load_dotenv
load_dotenv()
from omnilog.send_to_db import send_to_db
from llm.get_openai_response import get_openai_response

prompt = "What is a proompt?"
log = get_openai_response(prompt)
log["input"]= prompt

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise EnvironmentError(f"DATABASE_URL not found: {DATABASE_URL}\nMake sure that you have a DATABASE_URL value in the .env file.")

send_to_db(DATABASE_URL, log)