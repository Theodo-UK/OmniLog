import datetime

from prisma.types import llm_logsCreateInput

from omnilogger.errors import LogDictKeyError


def check_url_type(url):
    if not isinstance(url, str):
        raise TypeError("Have you checked your url connection string is correct?")


def check_log_type(log: llm_logsCreateInput):
    if not isinstance(log, dict):
        raise LogDictKeyError()
    
    if set(log.keys()) != {
        "datetime_utc",
        "input_string",
        "output_string",
        "total_tokens",
    }:
        raise LogDictKeyError()
    
    if not isinstance(log["datetime_utc"], datetime.datetime):
        raise TypeError("log.datetime_utc must be a datetime object")
    if not isinstance(log["input_string"], str):
        raise TypeError("log.input_string must be a string")
    if not isinstance(log["output_string"], str):
        raise TypeError("log.output_string must be a string")
    if type(log["total_tokens"]) is not int:
        raise TypeError("log.total_tokens must be an integer")

if __name__ == "__main__":
    check_log_type(True)