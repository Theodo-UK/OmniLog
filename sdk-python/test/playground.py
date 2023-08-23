import os
from dotenv import load_dotenv
import openai

from omnilogger import start_listener

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

start_listener(DATABASE_URL)

openai.api_key = OPENAI_API_KEY
openai.Completion.create(
    model="text-davinci-003",
    prompt="How are rubber ducks used in IT",
    temperature=0.6,
)
