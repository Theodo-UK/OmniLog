from datetime import datetime

import openai
from prisma.types import llm_logsCreateInput

from .database import send_to_db


class CustomCompletion(openai.Completion):
    @classmethod
    def create(cls, model: str, prompt: str, **kwargs):
        result = super().create(model=model, prompt=prompt, **kwargs)
        log = llm_logsCreateInput(
            input_string=prompt,
            output_string=result["choices"][0]["text"],
            datetime_utc=datetime.utcfromtimestamp(result["created"]),
            total_tokens=result["usage"]["total_tokens"],
        )

        send_to_db(log)
        return result


def start_openai_listener():
    openai.Completion = CustomCompletion
