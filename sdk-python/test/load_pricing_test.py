import unittest
import os
from omnilogger.get_pricing import write_default_json_to, read_json_at, load_llm_pricing


class TestURLType(unittest.TestCase):
    test_path = os.path.dirname(__file__)
    mock_pricing_path = os.path.join(test_path, "mock/pricing.json")
    expected_pricing = {
        "updated_at": "2023-09-20T12:00:00.000Z",
        "openai": {
            "davinci-003": {"input": 0.02, "output": 0.02},
            "gpt-3.5-turbo": {"input": 0.0015, "output": 0.002},
            "gpt-3.5-turbo-16k": {
                "training": 0.008,
                "input": 0.003,
                "output": 0.004,
            },
            "gpt-4": {"input": 0.03, "output": 0.06},
            "gpt-4-32k": {"input": 0.06, "output": 0.012},
            "babbage-002": {"training": 0.0004, "input": 0.0016, "output": 0.0016},
            "davinci-002": {"training": 0.006, "input": 0.012, "output": 0.012},
            "text-curie-001": {"input": 0.002, "output": 0.002},
            "text-ada-001": {"input": 0.0004, "output": 0.0004},
        },
    }

    def test_read_write_json(self):
        write_default_json_to(self.mock_pricing_path)

        test_json_content = read_json_at(self.mock_pricing_path)

        self.assertDictEqual(test_json_content, self.expected_pricing)

        os.remove(self.mock_pricing_path)

    def test_loader(self):
        pricing = load_llm_pricing()

        self.assertDictEqual(pricing, self.expected_pricing)
