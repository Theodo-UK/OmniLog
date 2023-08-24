import io
import logging
import unittest

from omnilogger.logger import OpenAIFilter


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
        handler_2.addFilter(
            OpenAIFilter("postgres://testuser:1234qwer@host:5432/testdb")
        )
        parent.addHandler(handler_1)
        child.addHandler(handler_2)

        child.info(self.input)
        handler_1.flush()
        handler_2.flush()

        self.result = stream_2.getvalue()

    def test_valid_filter(self):
        """
        Given a record containing 'OpenAI' and "message='OpenAI API response'"
        When it is processed by the filter,
        then the record is removed from the stream.
        """
        self.input = "message='OpenAI API response' path=http://api.openai.com"
        self.compute_result("test_valid_filter")
        self.assertEqual(self.result, "")

    def test_filter_request(self):
        """
        Given a record containing "message='Request to OpenAI API'"
        When it is processed by the filter,
        then the record is removed from the stream.
        """
        self.input = "message='Request to OpenAI API' path=https://api.openai.com"
        self.compute_result("test_filter_request")
        self.assertEqual(self.result, "")

    def test_filter_post_details(self):
        """
        Given a record containing "message='Post details'"
        When it is processed by the filter,
        then the record is removed from the stream.
        """
        self.input = (
            'message=\'Post details\' path=https://api.openai.com body={"prompt": "This'
            ' is a prompt"}'
        )
        self.compute_result("test_filter_post_details")
        self.assertEqual(self.result, "")

    def test_filter_no_special_message(self):
        """
        Given a record from OpenAI not containing a specific message
        When it is processed by the filter,
        then the record is not modified.
        """
        self.input = "message='OpenAI random discussion' path=https://api.openai.com"
        self.compute_result("test_filter_no_message")
        self.assertEqual(self.result, f"{self.input}\n")

    def test_filter_no_openai(self):
        """
        Given a record not containing 'OpenAI'
        When it is processed by the filter,
        then the record is not modified.
        """
        self.input = "message='Laama API response' path=https://api.llama.com"
        self.compute_result("test_filter_no_openai")
        self.assertEqual(self.result, f"{self.input}\n")
