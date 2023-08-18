import psycopg2
from omnilog.input_validation import check_log_type, check_url_type


def send_to_db(url, log):
    check_url_type(url)
    check_log_type(log)

    connection, cursor = connect_to_db(url)

    cursor.execute(
        """
    INSERT INTO llm_logs (datetime_utc, input_string, output_string, total_tokens)
    VALUES (%s, %s, %s, %s);
    """,
        (log["datetime_utc"], log["input"], log["output"], log["total_tokens"]),
    )

    connection.commit()
    cursor.close()
    connection.close()


def connect_to_db(url):
    try:
        conn = psycopg2.connect(url)
    except psycopg2.OperationalError:
        print(f"Could not connect to database: {url}\n")
        raise

    cur = conn.cursor()
    cur.execute("SELECT NOW();")
    time = cur.fetchone()[0]

    cur.execute("SELECT version();")
    version = cur.fetchone()[0]

    if not time or not version:
        raise ConnectionError(f"Could not connect to database: {url}")

    print("Current time:", time)
    print("PostgreSQL version:", version)
    return conn, cur
