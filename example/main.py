import os
from dotenv import load_dotenv
load_dotenv()
from omnilog.get_llm_response import get_llm_response
from omnilog.write_data import write_data
from omnilog.connect_to_db import connect_to_db
from datetime import datetime

prompt = "What is a proompt?"
response = get_llm_response(prompt)

DATABASE_URL = os.getenv("DATABASE_URL")
connection, cursor = connect_to_db(DATABASE_URL)

write_data(cursor, datetime.utcfromtimestamp(response.created), prompt, response.choices[0].text, response.usage.total_tokens)

connection.commit()

cursor.close()
connection.close()