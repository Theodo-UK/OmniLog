import json
import os

from format_finder import extract_reference, fetch_api_format

print(
    "====================== Start validating the OpenAI API reference format"
    " ======================"
)
result = fetch_api_format()

reference_path = os.path.abspath("./test/openai_api/reference_format.json")
with open(reference_path, "r") as f:
    reference = json.load(f)
    if result.find(reference) != -1:
        print("The OpenAI API format is up-to-date.")
    else:
        message = (
            "The OpenAI API format has changed. Run "
            + "'poetry run python test/openai_api/update_format.py' "
            + "to update the test.\nCurrent format:"
            + extract_reference(result)
            + "\nPrevious format:"
            + reference
        )
        raise ValueError(message)
