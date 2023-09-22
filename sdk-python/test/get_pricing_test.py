import unittest

from omnilogger.pricing.pricing_class import Pricing


class TestURLType(unittest.TestCase):
    pricing = Pricing(is_test=True)

    def test_valid_arg(self):
        """
        When llm and model are valid,
        And the model data is valid
        Then fetch_model_data should return True
        And target_prices should be set to the correct value
        """
        model_prices = self.pricing.fetch_model_data("openai", "text-davinci-003")
        if not model_prices:
            self.fail("Failed to fetch model data")

        expected_davinci_003 = {
            "input": 0.02,
            "output": 0.02,
        }
        self.assertDictEqual(model_prices, expected_davinci_003)

    def test_invalid_key(self):
        """
        When llm is invalid,
        Then fetch_model_data should return False
        And target_prices should be None
        """
        model_prices = self.pricing.fetch_model_data("open_ai_api", "text-davinci-003")
        if model_prices:
            self.fail("Should not fetch model data")
        self.assertIsNone(model_prices)
