import os
from dotenv import load_dotenv
load_dotenv()
from omnilog import write_data, connect_to_db
from llm import get_openai_response
from datetime import datetime

prompt = "What is a proompt?"
response = get_openai_response(prompt)

DATABASE_URL = os.getenv("DATABASE_URL")
connection, cursor = connect_to_db(DATABASE_URL)

write_data(cursor, datetime.utcfromtimestamp(response.created), prompt, response.choices[0].text, response.usage.total_tokens)

connection.commit()

cursor.close()
connection.close()