import os
import openai

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise EnvironmentError(f"OPENAI_API_KEY not found: {OPENAI_API_KEY}\nMake sure that you have an OPENAI_API_KEY value in the .env file.")

openai.api_key = OPENAI_API_KEY
def get_openai_response(prompt: str):
    return openai.Completion.create(
            model="text-davinci-003",
            prompt=prompt,
            temperature=0.6,
        )