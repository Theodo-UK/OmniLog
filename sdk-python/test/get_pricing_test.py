import unittest

from omnilogger.get_pricing import get_pricing


class TestURLType(unittest.TestCase):
    def test_valid_arg(self):
        davinci_003 = get_pricing("openai", "text-davinci-003")

        expected_davinci_003 = {
            "input": 0.02,
            "output": 0.02,
        }
        self.assertIsNotNone(davinci_003)
        if davinci_003 is not None:
            self.assertDictEqual(davinci_003, expected_davinci_003)

    def test_llm_not_found(self):
        open_ai_api = get_pricing("open_ai_api", "text-davinci-003")

        self.assertIsNone(open_ai_api)

    def test_model_not_found(self):
        davinci_004 = get_pricing("openai", "text-davinci-004")

        self.assertIsNone(davinci_004)
