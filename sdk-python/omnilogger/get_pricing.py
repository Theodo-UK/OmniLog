import json
import os

import platformdirs


def get_pricing(llm: str, model: str) -> dict:
    pricing = load_llm_pricing()

    if llm not in pricing:
        return None

    if model not in pricing[llm]:
        return None

    return pricing[llm][model]


def load_llm_pricing():
    app_name = "omnilogger"
    app_author = "theodo_uk"

    config_dir = platformdirs.user_data_dir(app_name, app_author)
    pricing_path = os.path.join(config_dir, "pricing.json")

    if not os.path.exists(config_dir):
        os.makedirs(config_dir)

    if not os.path.exists(pricing_path):
        write_default_json_to(pricing_path)

    pricing = read_json_at(pricing_path)

    return pricing


def read_json_at(path: str) -> dict:
    with open(path, "r") as json_file:
        return json.load(json_file)


def write_default_json_to(target_path: str) -> None:
    omnilogger_path = os.path.dirname(__file__)
    default_json_path = os.path.join(omnilogger_path, "data/pricing.json")
    default_json_content = read_json_at(default_json_path)

    with open(target_path, "w") as json_file:
        json.dump(default_json_content, json_file, indent=4)
