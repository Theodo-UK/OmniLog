import unittest
from typing import Any
from unittest.mock import patch

import pytest

from omnilogger.pricing.pricing_class import Pricing
from omnilogger.pricing.storage_manager import pricing_reference_path


class TestPriceModelData(unittest.TestCase):
    llm = "openai"
    model = "text-davinci-003"
    pricing: Pricing
    dict_msg: str
    price_msg: str

    @patch("omnilogger.pricing.pricing_class.pricing_config_path")
    def setUp(self, mock_pricing_path: Any):  # pylint: disable=arguments-differ
        mock_pricing_path.return_value = pricing_reference_path()
        self.pricing = Pricing()
        self.dict_msg = (
            "The price of the model must be a dictionary containing"
            f" input and output properties. {self.pricing.help_edit_msg}"
        )
        self.price_msg = (
            "The price of the model must be a positive float."
            f" {self.pricing.help_edit_msg}"
        )

    @pytest.fixture(autouse=True)
    def inject_fixture(self, caplog: Any):
        self.caplog = caplog  # pylint: disable=attribute-defined-outside-init
        yield
        self.caplog.clear()

    def test_valid_args(self):
        """
        When valid args are given,
        then no warning is logged
        """
        self.pricing.fetch_model_data(self.llm, self.model)
        for record in self.caplog.records:
            self.fail(record.message)

    def test_invalid_llm(self):
        """
        When prices is not a dict,
        then False is returned and a warning is logged
        """
        invalid_model_data = True
        res = self.pricing.is_model_data_valid(invalid_model_data)  # type: ignore

        self.assertFalse(res)
        self.assertIn(self.dict_msg, self.caplog.text)

    def test_invalid_input_price(self):
        """
        When prices is missing input price,
        then False is returned and a warning is logged
        """
        invalid_model_data = {
            "output": 0.1,
        }
        res = self.pricing.is_model_data_valid(invalid_model_data)  # type: ignore

        self.assertFalse(res)
        self.assertIn(self.dict_msg, self.caplog.text)

    def test_invalid_output_price(self):
        """
        When prices is missing output price,
        then False is returned and a warning is logged
        """
        invalid_model_data = {
            "input": 0.1,
        }
        res = self.pricing.is_model_data_valid(invalid_model_data)  # type: ignore

        self.assertFalse(res)
        self.assertIn(self.dict_msg, self.caplog.text)

    def test_invalid_input_price_type(self):
        """
        When input price is not a float,
        then False is returned and a warning is logged
        """
        invalid_model_data = {
            "input": True,
            "output": 0.1,
        }
        res = self.pricing.is_model_data_valid(invalid_model_data)  # type: ignore

        self.assertFalse(res)
        self.assertIn(self.price_msg, self.caplog.text)

    def test_invalid_output_price_type(self):
        """
        When output price is not a float,
        then False is returned and a warning is logged
        """
        invalid_model_data = {
            "input": 0.1,
            "output": True,
        }
        res = self.pricing.is_model_data_valid(invalid_model_data)  # type: ignore

        self.assertFalse(res)
        self.assertIn(self.price_msg, self.caplog.text)

    def test_invalid_input_price_value(self):
        """
        When input price is not positive,
        then False is returned and a warning is logged
        """
        invalid_model_data = {
            "input": -0.1,
            "output": 0.1,
        }
        res = self.pricing.is_model_data_valid(invalid_model_data)  # type: ignore

        self.assertFalse(res)
        self.assertIn(self.price_msg, self.caplog.text)

    def test_invalid_output_price_value(self):
        """
        When output price is not positive,
        then False is returned and a warning is logged
        """
        invalid_model_data = {
            "input": 0.1,
            "output": -0.1,
        }
        res = self.pricing.is_model_data_valid(invalid_model_data)  # type: ignore

        self.assertFalse(res)
        self.assertIn(self.price_msg, self.caplog.text)
