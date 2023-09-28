import unittest

from omnilogger import cost_calculator


class TestCalculator(unittest.TestCase):
    def test_valid_args(self):
        """
        When valid args are given,
        Then cost_calculator should return the correct value
        """
        res = cost_calculator("openai", "text-davinci-003", 100, 100)
        self.assertEqual(res, 0.004)

    def test_invalid_llm(self):
        """
        When llm is invalid,
        Then cost_calculator should return None
        """
        res = cost_calculator("open_ai_api", "text-davinci-003", 100, 100)
        self.assertIsNone(res)

    def test_invalid_model(self):
        """
        When model is invalid,
        Then cost_calculator should return None
        """
        res = cost_calculator("openai", "invalid_model", 100, 100)
        self.assertIsNone(res)

    def test_invalid_input(self):
        """
        When input is invalid,
        Then cost_calculator should return None
        """
        res = cost_calculator("openai", "text-davinci-003", -100, 100)
        self.assertIsNone(res)

    def test_invalid_output(self):
        """
        When output is invalid,
        Then cost_calculator should return None
        """
        res = cost_calculator("openai", "text-davinci-003", 100, -100)
        self.assertIsNone(res)
