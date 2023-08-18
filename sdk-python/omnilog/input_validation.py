import datetime

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
