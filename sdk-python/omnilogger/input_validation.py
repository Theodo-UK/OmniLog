import datetime

from prisma.types import llmLogsCreateInput

from .errors import LogDictKeyError


def check_url_type(url):
    if not isinstance(url, str):
        raise TypeError("Have you checked your url connection string is correct?")


def check_log_type(log: llmLogsCreateInput):
    assert isinstance(log, dict), LogDictKeyError()
    assert set({**log.copy(), "id": -1}.keys()) == set(
        llmLogsCreateInput.__annotations__.keys()
    ), LogDictKeyError()

    assert isinstance(log["datetime_utc"], datetime.datetime), TypeError(
        "log.datetime_utc must be a datetime object"
    )
    assert isinstance(log["input_string"], str), TypeError(
        "log.input_string must be a string"
    )
    assert isinstance(log["output_string"], str), TypeError(
        "log.output_string must be a string"
    )
    assert type(log["total_tokens"]) is int, TypeError(
        "log.total_tokens must be an integer"
    )
    assert isinstance(log["cost"], float), TypeError("log.cost must be a float")
