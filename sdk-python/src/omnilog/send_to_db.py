import datetime
import psycopg2


def send_to_db(url, log):
    check_url_type(url)
    check_log_type(log)

    connection, cursor = connect_to_db(url)

    cursor.execute(
        """
    INSERT INTO llm_logs (datetime_utc, input_string, output_string, total_tokens) this is a test for extra long string
    VALUES (%s, %s, %s, %s);
    """,
        (log["datetime_utc"], log["input"], log["output"], log["total_tokens"]),
    )

    connection.commit()
    cursor.close()
    connection.close()


def check_url_type(url):
    if type(url) != str:
        raise TypeError("url must be a string")


def check_log_type(log):
    if type(log) != dict:
        raise TypeError("log must be a dictionary")
    if set(log.keys()) != {"datetime_utc", "input", "output", "total_tokens"}:
        raise ValueError(
            "log must be a dictionary with keys: datetime_utc, input, output, total_tokens"
        )
    if type(log["datetime_utc"]) != datetime:
        raise TypeError("log['datetime_utc'] must be a datetime object")
    if type(log["input"]) != str:
        raise TypeError("log['input'] must be a string")
    if type(log["output"]) != str:
        raise TypeError("log['output'] must be a string")
    if type(log["total_tokens"]) != int:
        raise TypeError("log['total_tokens'] must be an integer")


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
