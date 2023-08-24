import json
import logging
import sys
from datetime import datetime

import openai

from omnilogger import send_to_db


def start_listener(url: str):
    openai.log = "debug"

    log_handler = logging.StreamHandler()
    log_handler.addFilter(OpenAIFilter(url))

    logger = logging.getLogger("omnilog")
    logger.handlers = [log_handler]

    sys.stderr = StreamToLogger(logger, logging.ERROR)


class OpenAIFilter(logging.Filter):
    url: str
    prompt: str

    def __init__(self, url):
        self.url = url
        self.prompt = ""

    def filter(self, record) -> bool:
        msg = record.getMessage()

        if "OpenAI" in msg or "openai" in msg or "text-davinci-003" in msg:
            if "message='Request to OpenAI API'" in msg:
                return False

            if "message='Post details'" in msg:
                try:
                    self.extract_prompt_from_request(msg)
                except IndexError:
                    record.msg = "Prompt not found in OpenAI request: " + msg
                    return True
                return False

            if "message='OpenAI API response'" in msg:
                return False

            if "message='API response body'" in msg:
                try:
                    self.handle_openai_response(msg)
                except json.decoder.JSONDecodeError:
                    record.msg = "JSONDecodeError for OpenAI response: " + msg
                    return True
                return False
        return True

    def extract_output_from_response(self, data: str):
        output = data.split("body='")[1].split("' headers=")[0]
        output = bytes(output, "utf-8").decode("unicode_escape")
        output = json.loads(output)

        log = {
            "input": self.prompt,
            "datetime_utc": datetime.utcfromtimestamp(output["created"]),
            "output": output["choices"][0]["text"],
            "total_tokens": output["usage"]["total_tokens"],
        }
        send_to_db(self.url, log)

    def extract_prompt_from_request(self, data: str):
        self.prompt = data.split('"prompt": "')[1]
        self.prompt = self.prompt.split('", "temperature"')[0]


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
