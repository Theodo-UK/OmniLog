import datetime


def check_url_type(url):
    if not isinstance(url, str):
        raise TypeError("Have you checked your url connection string is correct?")


def check_log_type(log):
    if not isinstance(log, dict):
        raise TypeError(
            "Have you checked your log is a dictionary?\nlog must be a dictionary with"
            " keys: datetime_utc, input, output, total_tokens"
        )
    if set(log.keys()) != {"datetime_utc", "input", "output", "total_tokens"}:
        raise KeyError(
            "log must be a dictionary with keys: datetime_utc, input, output,"
            " total_tokens"
        )
    if not isinstance(log["datetime_utc"], datetime.datetime):
        raise TypeError("log.datetime_utc must be a datetime object")
    if not isinstance(log["input"], str):
        raise TypeError("log.input must be a string")
    if not isinstance(log["output"], str):
        raise TypeError("log.output must be a string")
    if type(log["total_tokens"]) is not int:
        raise TypeError("log.total_tokens must be an integer")
