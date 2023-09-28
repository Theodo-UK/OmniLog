import json
import os
from typing import Any

import platformdirs


def pricing_reference_path() -> str:
    return os.path.join(os.path.dirname(__file__), "pricing.json")


def pricing_config_path() -> str:
    app_name = "omnilogger"
    app_author = "theodo_uk"

    config_dir = platformdirs.user_data_dir(app_name, app_author)

    if not os.path.exists(config_dir):
        os.makedirs(config_dir)

    return os.path.join(config_dir, "pricing.json")


def read_json_at(path: str) -> Any:
    with open(path, "r", encoding="utf-8") as json_file:
        return json.load(json_file)


def copy_json(source_path: str, target_path: str) -> None:
    default_json_content = read_json_at(source_path)

    with open(target_path, "w", encoding="utf-8") as json_file:
        json.dump(default_json_content, json_file, indent=4)
