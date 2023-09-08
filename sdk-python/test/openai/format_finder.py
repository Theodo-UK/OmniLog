import os


def extract_chatcompletion_ref(full_data: str) -> str:
    start_index = full_data.find("chat_completion_example |")
    result = full_data[start_index:]
    result = result.replace("chat_completion_example |", "")
    end_index = result.find("      - title: ")
    result = result[:end_index]
    return result


def fetch_api_format() -> str:
    result = os.popen(
        "curl https://raw.githubusercontent.com/"
        + "openai/openai-openapi/master/openapi.yaml"
    ).read()
    return result
