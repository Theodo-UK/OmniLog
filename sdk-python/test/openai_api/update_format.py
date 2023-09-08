import json
import os

from format_finder import extract_chatcompletion_ref, fetch_api_format

result = fetch_api_format()
result = extract_chatcompletion_ref(result)
print("Updating the OpenAI API reference format to:\n", result)

reference_path = os.path.abspath("./test/openai_api/chatcompletion_ref.json")
with open(reference_path, "w") as f:
    json.dump(result, f)
