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

response = openai.Completion.create(
            model="text-davinci-003",
            prompt=generate_prompt("Mouse"),
            temperature=0.6,
        )

print(response)

DATABASE_URL = os.getenv('DATABASE_URL')

if not DATABASE_URL:
    raise EnvironmentError(f"DATABASE_URL not found: {DATABASE_URL}\nMake sure that you have a DATABASE_URL value in the .env file.")

conn = psycopg2.connect(DATABASE_URL)
cur = conn.cursor()

cur.execute('SELECT NOW();')
time = cur.fetchone()[0]

cur.execute('SELECT version();')
version = cur.fetchone()[0]

print('Current time:', time)
print('PostgreSQL version:', version)

cur.close()
conn.close()