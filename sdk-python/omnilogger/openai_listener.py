from datetime import datetime

import openai
from prisma.types import llm_logsCreateInput

from .database import send_to_db
from .calculator import cost_calculator


class CustomCompletion(openai.Completion):
    @classmethod
    def create(cls, model: str, prompt: str, **kwargs):
        result = super().create(model=model, prompt=prompt, **kwargs)
        input_tokens = result["usage"]["prompt_tokens"]
        output_tokens = result["usage"]["completion_tokens"]
        cost = cost_calculator("openai", model, input_tokens, output_tokens)
        log = llm_logsCreateInput(
            input_string=prompt,
            output_string=result["choices"][0]["text"],
            datetime_utc=datetime.utcfromtimestamp(result["created"]),
            total_tokens=result["usage"]["total_tokens"],
            cost=cost,
        )

        send_to_db(log)
        return result


def start_openai_listener():
    openai.Completion = CustomCompletion
