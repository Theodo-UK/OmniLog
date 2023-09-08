import json
import os

from format_finder import extract_chatcompletion_ref, fetch_api_format

print(
    "====================== Start validating the OpenAI API reference format"
    " ======================"
)
result = fetch_api_format()

reference_path = os.path.abspath("./test/openai_api/chatcompletion_ref.json")
with open(reference_path, "r") as f:
    reference = json.load(f)
    if result.find(reference) != -1:
        print("The OpenAI API format is up-to-date.")
    else:
        message = (
            "The OpenAI API format has changed. "
            + "Please update the extraction of data in openai_listener.py "
            + "and the reference format in chatcompletion.json by running "
            + "'poetry run python test/openai_api/update_format.py'."
            + "\nCurrent format:"
            + extract_chatcompletion_ref(result)
            + "\nPrevious format:"
            + reference
        )
        raise ValueError(message)
