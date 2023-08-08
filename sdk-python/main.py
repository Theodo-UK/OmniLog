import os
import openai
from dotenv import load_dotenv
import psycopg2

load_dotenv()

def generate_prompt(animal: str):
    return f"""Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: {animal.capitalize()}
Names:"""

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise EnvironmentError(f"OPENAI_API_KEY not found: {OPENAI_API_KEY}\nMake sure that you have an OPENAI_API_KEY value in the .env file.")

openai.api_key = OPENAI_API_KEY

input_string = "Mouse"

response = openai.Completion.create(
            model="text-davinci-003",
            prompt=generate_prompt(input_string),
            temperature=0.6,
        )

DATABASE_URL = os.getenv('DATABASE_URL')

if not DATABASE_URL:
    raise EnvironmentError(f"DATABASE_URL not found: {DATABASE_URL}\nMake sure that you have a DATABASE_URL value in the .env file.")

conn = psycopg2.connect(DATABASE_URL)
cur = conn.cursor()

cur.execute('SELECT NOW();')
time = cur.fetchone()[0]

cur.execute('SELECT version();')
version = cur.fetchone()[0]

if not time or not version:
    raise ConnectionError(f"Could not connect to database: {DATABASE_URL}")

print('Current time:', time)
print('PostgreSQL version:', version)

with open('schema.sql', 'r') as f:
    schema = f.read()

try: 
    cur.execute(schema)
except psycopg2.errors.DuplicateTable as e:
    print(f"Table schema already defined: {e}")
    conn.rollback()


cur.execute("""
    INSERT INTO llm_logs (unixtime_seconds, input_string, output_string, total_tokens)
    VALUES (%s, %s, %s, %s);
""", (response.created, input_string, response.choices[0].text, response.usage.total_tokens))

conn.commit()

cur.close()
conn.close()