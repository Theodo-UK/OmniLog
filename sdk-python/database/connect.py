import os
import psycopg2
from dotenv import load_dotenv
load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')

if not DATABASE_URL:
    raise EnvironmentError(f"DATABASE_URL not found: {DATABASE_URL}\nMake sure that you have a DATABASE_URL value in the .env file.")

def connect_to_db():
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
    return conn, cur