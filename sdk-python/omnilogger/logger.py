from datetime import datetime
import json
import logging
import sys
import openai
from omnilogger import send_to_db


def start_listener(url: str):
    openai.log = "debug"

    log_handler = logging.StreamHandler()
    log_handler.addFilter(OpenAIFilter(url))

    logger = logging.getLogger("omnilog")
    logger.handlers = [log_handler]

    sys.stderr = StreamToLogger(logger, logging.ERROR)


def handle_openai_response(data: str, url: str):
    output = data.split("body='")[1].split("' headers=")[0]
    output = bytes(output, "utf-8").decode("unicode_escape")
    output = json.loads(output)

    log = {
        "input": "This is a new dummy input!",
        "datetime_utc": datetime.utcfromtimestamp(output["created"]),
        "output": output["choices"][0]["text"],
        "total_tokens": output["usage"]["total_tokens"],
    }
    send_to_db(url, log)


class OpenAIFilter(logging.Filter):
    url: str

    def __init__(self, url):
        self.url = url

    def filter(self, record) -> bool:
        msg = record.getMessage()

        if "OpenAI" in msg or "openai" in msg:
            if "message='Request to OpenAI API'" in msg:
                return False

            if "message='Post details'" in msg:
                return False

            if "message='OpenAI API response'" in msg:
                return False

            if "message='API response body'" in msg:
                try:
                    handle_openai_response(msg, self.url)
                except json.decoder.JSONDecodeError:
                    record.msg = "JSONDecodeError for OpenAI response: " + msg
                    return True
                return False
        return True


class StreamToLogger(object):
    """
    Fake file-like stream object that redirects writes to a logger instance.
    """

    def __init__(self, logger, log_level=logging.INFO):
        self.logger = logger
        self.log_level = log_level
        self.linebuf = ""

    def write(self, buf):
        temp_linebuf = self.linebuf + buf
        self.linebuf = ""
        for line in temp_linebuf.splitlines(True):
            # From the io.TextIOWrapper docs:
            #   On output, if newline is None, any '\n' characters written
            #   are translated to the system default line separator.
            # By default sys.stdout.write() expects '\n' newlines and then
            # translates them so this is still cross platform.
            if line[-1] == "\n":
                self.logger.log(self.log_level, line.rstrip())
            else:
                self.linebuf += line

    def flush(self):
        if self.linebuf != "":
            self.logger.log(self.log_level, self.linebuf.rstrip())
        self.linebuf = ""
