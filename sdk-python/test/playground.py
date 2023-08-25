import os

import openai
from dotenv import load_dotenv

from omnilogger import start_listener

if __name__ == "__main__":
    load_dotenv()

    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    if OPENAI_API_KEY is None:
        raise ValueError("Missing environment variables")

    start_listener()

    openai.api_key = OPENAI_API_KEY
    openai.Completion.create(
        model="text-davinci-003",
        prompt="how about now",
        temperature=0.6,
    )
