import os
from dotenv import load_dotenv

from omnilogger import send_to_db
from llm.get_openai_response import get_openai_response

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise EnvironmentError(
        f"DATABASE_URL not found: {DATABASE_URL}\nMake sure that you have a DATABASE_URL value in the .env file."
    )

prompt = "What is a rubber duck?"
log = get_openai_response(prompt)
log["input"] = prompt

send_to_db(DATABASE_URL, log)
