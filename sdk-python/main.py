from dotenv import load_dotenv
load_dotenv()
from database.connect import connect_to_db
from database.write_data import write_data
from models.get_llm_response import get_llm_response
from datetime import datetime 

prompt = "What is a proompt?"
response = get_llm_response(prompt)

connection, cursor = connect_to_db()

write_data(cursor, datetime.utcfromtimestamp(response.created), prompt, response.choices[0].text, response.usage.total_tokens)

connection.commit()

cursor.close()
connection.close()