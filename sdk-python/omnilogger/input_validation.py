import datetime

from prisma.types import llmLogsCreateInput

from omnilogger.helpers.errors import LogDictKeyError


def check_log_type(log: llmLogsCreateInput):
    assert isinstance(log, dict), LogDictKeyError()
    assert set({**log.copy(), "projectId": "test"}.keys()) == set(
        [
            "datetime_utc",
            "input_string",
            "output_string",
            "total_tokens",
            "cost",
            "projectId",
        ]
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
    if "cost" in log:
        assert isinstance(log["cost"], float), TypeError("log.cost must be a float")
    if "projectId" in log:
        assert isinstance(log["projectId"], str | None), TypeError(
            "log.projectId must be a string"
        )
