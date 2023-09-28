import os
from typing import Callable

from omnilogger.helpers.logger import create_logger
from omnilogger.pricing.storage_manager import (
    copy_json,
    pricing_config_path,
    pricing_reference_path,
    read_json_at,
)
from omnilogger.pricing.typedDicts import ModelData


class Pricing:
    data: dict[str, dict[str, ModelData]]
    help_edit_msg: str
    __warn: Callable[[str], None]

    def __init__(self):
        self.__warn = create_logger("pricing")
        local_path = pricing_config_path()
        self.__init_llm_pricing_data(local_path)
        self.help_edit_msg: str = (
            f"You can navigate to {local_path} to edit the pricing data."
        )

    def __init_llm_pricing_data(self, local_path: str):
        reference_pricing_path = pricing_reference_path()
        try:
            if not os.path.exists(local_path):
                copy_json(reference_pricing_path, local_path)
            temp_data = read_json_at(local_path)
        except Exception as err:  # pylint: disable=broad-except
            self.__warn("Failed to load pricing.json: " + err.__str__() + "\n")
            return
        if temp_data is None:
            self.__warn("Loaded pricing.json is empty")
            return
        self.data = temp_data

    def get_llms(self) -> list[str]:
        return list(self.data.keys())

    def get_models(self, llm: str) -> list[str]:
        return list(self.data[llm].keys())

    def fetch_model_data(self, llm: str, model: str) -> ModelData | None:
        if self.are_keys_valid(llm, model):
            temp_data = self.data[llm][model]
            if self.is_model_data_valid(temp_data):
                return temp_data
        return None

    def are_keys_valid(self, llm: str, model: str) -> bool:
        not_found_in = " was not found in pricing dict. Pick one of the following: "

        if not isinstance(llm, str):  # type: ignore
            self.__warn("llm must be a string")
            return False

        llm_list_str = ", ".join(self.get_llms())
        if llm not in self.data:
            self.__warn(llm + not_found_in + llm_list_str)
            return False

        if not isinstance(model, str):  # type: ignore
            self.__warn("model must be a string")
            return False

        model_list_str = ", ".join(self.get_models(llm))
        if model not in self.get_models(llm):
            self.__warn(model + not_found_in + model_list_str)
            return False

        return True

    def is_model_data_valid(self, temp_data: ModelData) -> bool:
        dict_msg = (
            "The price of the model must be a dictionary containing"
            f" input and output properties. {self.help_edit_msg}"
        )
        price_msg = (
            f"The price of the model must be a positive float. {self.help_edit_msg}"
        )

        try:
            input_price = temp_data["input"]
            output_price = temp_data["output"]
        except (TypeError, KeyError):
            self.__warn(dict_msg)
            return False

        is_input_type_valid = isinstance(input_price, float)  # type: ignore
        is_output_type_valid = isinstance(output_price, float)  # type: ignore
        if not is_input_type_valid or not is_output_type_valid:
            self.__warn(price_msg)
            return False

        if input_price < 0 or output_price < 0:
            self.__warn(price_msg)
            return False

        return True
