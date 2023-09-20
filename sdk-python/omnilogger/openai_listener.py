from datetime import datetime
from typing import Any

import openai
from prisma.types import llm_logsCreateInput

from .database import send_to_db


class CustomCompletion(openai.Completion):
    @classmethod
    def create(cls, *args: Any, **kwargs: Any):
        result: dict[str, Any] = super().create(*args, **kwargs)  # type: ignore
        if "prompt" not in kwargs:
            raise ValueError("**kwargs 'prompt' is required")
        log = llm_logsCreateInput(
            input_string=kwargs["prompt"],
            output_string=result["choices"][0]["text"],
            datetime_utc=datetime.utcfromtimestamp(result["created"]),
            total_tokens=result["usage"]["total_tokens"],
        )

        send_to_db(log)
        return result


def start_openai_listener():
    openai.Completion = CustomCompletion
