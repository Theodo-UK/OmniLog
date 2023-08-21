import io
import logging
import unittest
from omnilog.start_listener import OpenAIFilter


class TestOpenAIFilter(unittest.TestCase):
    input: str
    result: str

    def compute_result(self, name):
        parent = logging.getLogger(name)
        parent.setLevel(logging.INFO)
        child = logging.getLogger(name + ".child")
        stream_1 = io.StringIO()
        stream_2 = io.StringIO()
        handler_1 = logging.StreamHandler(stream_1)
        handler_1.setLevel(logging.INFO)
        handler_2 = logging.StreamHandler(stream_2)
        handler_2.setLevel(logging.INFO)
        handler_2.addFilter(OpenAIFilter())
        parent.addHandler(handler_1)
        child.addHandler(handler_2)

        child.info(self.input)
        handler_1.flush()
        handler_2.flush()

        self.result = stream_2.getvalue()

    def test_valid_filter(self):
        """
        Given a record containing 'OpenAI' and 'response'
        When it is processed by the filter,
        then the record is modified.
        """
        self.input = "message='OpenAI API response' path=http://api.openai.com"
        self.compute_result("test_valid_filter")
        self.assertEqual(
            self.result,
            f"\nThis message has been caught from OpenAI:\n{self.input}\n\n",
        )

    def test_filter_no_openai(self):
        """
        Given a record not containing 'OpenAI'
        When it is processed by the filter,
        then the record is not modified.
        """
        self.input = "message='Laama API response' path=https://api.llama.com"
        self.compute_result("test_filter_no_openai")
        self.assertEqual(self.result, f"{self.input}\n")

    def test_filter_no_response(self):
        """
        Given a record not containing 'response'
        When it is processed by the filter,
        then the record is not modified.
        """
        self.input = "message='OpenAI API request' path=https://api.openai.com"
        self.compute_result("test_filter_no_response")
        self.assertEqual(self.result, f"{self.input}\n")
