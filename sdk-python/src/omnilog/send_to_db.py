import psycopg2

def send_to_db(url, log):

    connection, cursor = connect_to_db(url)

    write_data(cursor, log["datetime_utc"], log["input"], log["output"], log["token_count"])

    connection.commit()

    cursor.close()
    connection.close()


def connect_to_db(url):
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


def write_data(cur, time, prompt, response, tokens):
    cur.execute("""
    INSERT INTO llm_logs (datetime_utc, input_string, output_string, total_tokens)
    VALUES (%s, %s, %s, %s);
    """, (time, prompt, response, tokens))