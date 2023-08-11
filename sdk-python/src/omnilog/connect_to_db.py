import psycopg2

def connect_to_db(url):
    if not url:
        raise EnvironmentError(f"DATABASE_URL not found: {url}\nMake sure that you have a DATABASE_URL value in the .env file.")

    conn = psycopg2.connect(url)
    cur = conn.cursor()
    cur.execute('SELECT NOW();')
    time = cur.fetchone()[0]

    cur.execute('SELECT version();')
    version = cur.fetchone()[0]

    if not time or not version:
        raise ConnectionError(f"Could not connect to database: {url}")

    print('Current time:', time)
    print('PostgreSQL version:', version)
    return conn, cur