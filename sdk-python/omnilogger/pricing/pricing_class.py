import logging
import os

from omnilogger.pricing.storage_manager import (
    config_path_of,
    copy_json,
    mock_path_of,
    read_json_at,
)
from omnilogger.pricing.typedDicts import ModelData


class Pricing:
    updated_at: str
    data: dict[str, dict[str, ModelData]]
    __reference_pricing_path: str
    help_edit_msg: str

    def __init__(self, is_test: bool = False):
        try:
            self.__init_reference_pricing_path()
            self.__init_pricing_storage_path(is_test)
            self.__warn(
                "Pricing data is stored at "
                + self.local_path
                + ". You can edit it to change the prices."
            )
            self.__init_llm_pricing_data()
            self.help_edit_msg: str = (
                f"You can navigate to {self.local_path} to edit the pricing data."
            )
        except Exception as err:  # pylint: disable=broad-except
            self.__warn("Failed to load pricing: " + err.__str__())

    def __init_reference_pricing_path(self) -> None:
        self.__reference_pricing_path = os.path.join(
            os.path.dirname(__file__), "pricing.json"
        )

    def __init_pricing_storage_path(self, is_test: bool) -> None:
        pricing_path = (config_path_of if not is_test else mock_path_of)("pricing.json")
        self.local_path = pricing_path

    def __init_llm_pricing_data(self):
        if not os.path.exists(self.local_path):
            copy_json(self.__reference_pricing_path, self.local_path)

        temp_data = read_json_at(self.local_path)
        if temp_data is None:
            raise ValueError("pricing data is None")
        self.data = temp_data

    def __warn(self, message: str) -> None:
        logger = logging.getLogger("omnilogger pricing")
        logger.warning(message)

    def get_data(self) -> dict[str, dict[str, ModelData]]:
        return self.data

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

    def reset_pricing_to_default(self) -> None:
        copy_json(self.__reference_pricing_path, self.local_path)
        self.__init_llm_pricing_data()

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
