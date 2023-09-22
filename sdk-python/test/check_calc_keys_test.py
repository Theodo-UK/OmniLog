import unittest
from typing import Any

import pytest

from omnilogger.pricing.pricing_class import Pricing


class TestPriceKeys(unittest.TestCase):
    llm = "openai"
    model = "text-davinci-003"
    ref_pricing = Pricing(is_test=True)
    not_found_in = "was not found in pricing dict. Pick one of the following:"

    @pytest.fixture(autouse=True)
    def inject_fixture(self, caplog: Any):
        self.caplog = caplog  # pylint: disable=attribute-defined-outside-init
        yield
        self.caplog.clear()

    def test_valid_args(self):
        """
        When valid args are given,
        then True is returned and no warning is logged
        """
        res = self.ref_pricing.are_keys_valid(self.llm, self.model)
        self.assertTrue(res)
        for record in self.caplog.records:
            self.fail(record.message)

    def test_invalid_llm(self):
        """
        When llm is not a string,
        then False is returned and a warning is logged
        """
        llm = True

        check_keys = self.ref_pricing.are_keys_valid(llm, self.model)  # type: ignore

        self.assertFalse(check_keys)
        self.assertIn("llm must be a string", self.caplog.text)

    def test_invalid_model(self):
        """
        When model is not a string,
        then False is returned and a warning is logged
        """
        model = True

        check_keys = self.ref_pricing.are_keys_valid(self.llm, model)  # type: ignore

        self.assertFalse(check_keys)
        self.assertIn("model must be a string", self.caplog.text)

    def test_invalid_llm_key(self):
        """
        When llm is not a key in pricing,
        then False is returned and a warning is logged
        """
        llm = "invalid_llm"

        self.assertFalse(self.ref_pricing.are_keys_valid(llm, self.model))

        available_keys = ", ".join(self.ref_pricing.get_llms())
        expected_msg = f"{llm} {self.not_found_in} {available_keys}"
        self.assertIn(expected_msg, self.caplog.text)

    def test_invalid_model_key(self):
        """
        When model is not a key in pricing[llm],
        then False is returned and a warning is logged
        """
        model = "invalid_model"

        self.assertFalse(self.ref_pricing.are_keys_valid(self.llm, model))

        available_keys = ", ".join(self.ref_pricing.get_models(self.llm))
        expected_msg = f"{model} {self.not_found_in} {available_keys}"
        self.assertIn(
            expected_msg,
            self.caplog.text,
        )
