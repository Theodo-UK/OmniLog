import datetime
import psycopg2


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


def check_url_type(url):
    if type(url) != str:
        raise TypeError("Have you checked your url connection string is correct?")


def check_log_type(log):
    if type(log) is not dict:
        raise TypeError(
            f"Have you checked your log is a dictionary?\nlog must be a dictionary with keys: datetime_utc, input, output, total_tokens"
        )
    if set(log.keys()) != {"datetime_utc", "input", "output", "total_tokens"}:
        raise KeyError(
            "log must be a dictionary with keys: datetime_utc, input, output, total_tokens"
        )
    if type(log["datetime_utc"]) is not datetime.datetime:
        raise TypeError("log.datetime_utc must be a datetime object")
    if type(log["input"]) is not str:
        raise TypeError("log.input must be a string")
    if type(log["output"]) is not str:
        raise TypeError("log.output must be a string")
    if type(log["total_tokens"]) is not int:
        raise TypeError("log.total_tokens must be an integer")


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
