import openai


class CustomCompletion(openai.Completion):
    @classmethod
    def create(cls, model: str, prompt: str, **kwargs):
        result = super().create(model=model, prompt=prompt, **kwargs)
        print(prompt, result)  # TODO: reformat and call send_to_db
        return result


def start_openai_listener():
    openai.Completion = CustomCompletion
