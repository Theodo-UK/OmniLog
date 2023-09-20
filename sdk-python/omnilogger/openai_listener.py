from datetime import datetime
from typing import Any

import openai
from prisma.types import llmLogsCreateInput

from .calculator import cost_calculator
from .database import send_to_db


class CustomCompletion(openai.Completion):
    @classmethod
    def create(cls, *args: Any, **kwargs: Any):
        result: dict[str, Any] = super().create(*args, **kwargs)  # type: ignore
        input_tokens = result["usage"]["prompt_tokens"]
        output_tokens = result["usage"]["completion_tokens"]
        cost = None
        try:
            cost = cost_calculator(
                "openai", kwargs["model"], input_tokens, output_tokens
            )
        finally:
            log = llmLogsCreateInput(
                input_string=kwargs["prompt"],
                output_string=result["choices"][0]["text"],
                datetime_utc=datetime.utcfromtimestamp(result["created"]),
                total_tokens=result["usage"]["total_tokens"],
                cost=cost,
            )

        send_to_db(log)
        return result


def start_openai_listener():
    openai.Completion = CustomCompletion
