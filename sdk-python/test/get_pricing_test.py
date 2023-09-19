import unittest

from omnilogger import get_pricing


class TestURLType(unittest.TestCase):
    def test_valid_arg(self):
        davinci_003 = get_pricing("openai", "davinci-003")

        expected_davinci_003 = {
            "input": 0.02,
            "output": 0.02,
        }

        self.assertDictEqual(davinci_003, expected_davinci_003)

    def test_llm_not_found(self):
        open_ai_api = get_pricing("open_ai_api", "davinci-003")

        self.assertIsNone(open_ai_api)

    def test_model_not_found(self):
        davinci_004 = get_pricing("openai", "davinci-004")

        self.assertIsNone(davinci_004)
