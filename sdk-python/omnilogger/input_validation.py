import datetime

from prisma.types import llm_logsCreateInput

from omnilogger.errors import LogDictKeyError


def check_url_type(url):
    if not isinstance(url, str):
        raise TypeError("Have you checked your url connection string is correct?")


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


if __name__ == "__main__":
    log = llm_logsCreateInput(
        datetime_utc=datetime.datetime.utcnow(),
        input_string="What is this?",
        output_string="This is a test log",
        total_tokens=5,
    )
    mockLogWithId = {**log.copy(), "id": -1}
    mockLogWithId["id"] = -1
    print(set(log.keys()))
    print(set(llm_logsCreateInput.__annotations__.keys()))
    print(
        set({**log.copy(), "id": -1}.keys())
        == set(llm_logsCreateInput.__annotations__.keys())
    )
