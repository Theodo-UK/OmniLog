import datetime

from prisma.types import llm_logsCreateInput

from .errors import LogDictKeyError


def check_log_type(log: llm_logsCreateInput):
    assert isinstance(log, dict), LogDictKeyError()
    assert set({**log.copy(), "id": -1}.keys()) == set(
        llm_logsCreateInput.__annotations__.keys()
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
