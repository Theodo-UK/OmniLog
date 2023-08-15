import psycopg2
from omnilog.send_to_db import send_to_db
import unittest
import datetime


class TestTypes(unittest.TestCase):
    valid_url = "mongodb://localhost:27017/"
    valid_log = {
        "datetime_utc": datetime.datetime.utcnow(),
        "input": "What is this?",
        "output": "This is a test log",
        "total_tokens": 5,
    }

    def test_valid_inputs(self):
        """
        When correct arguments are given, then connection with psycopg2 is tried and fails
        """
        self.assertRaises(
            psycopg2.ProgrammingError,
            send_to_db,
            self.valid_url,
            self.valid_log,
        )

    def test_url(self):
        """
        When url is not a string, then TypeError is raised
        """
        url = True
        log = self.valid_log

        self.assertRaisesRegex(
            TypeError,
            "Have you checked your url connection string is correct?",
            send_to_db,
            url,
            log,
        )

    def test_log_type(self):
        """
        When log is not a dictionary, then TypeError is raised
        """
        url = self.valid_url
        log = True

        self.assertRaisesRegex(
            TypeError,
            "Have you checked your log is a dictionary?",
            send_to_db,
            url,
            log,
        )

    def test_log_missing_field(self):
        """
        When log is missing a field, then KeyError is raised
        """
        url = self.valid_url
        log = {"datetime_utc": datetime.datetime.utcnow()}

        self.assertRaisesRegex(
            KeyError,
            "log must be a dictionary with keys: datetime_utc, input, output, total_tokens",
            send_to_db,
            url,
            log,
        )

    def test_log_datetime_type(self):
        """
        When log datetime_utc is not a datetime, then TypeError is raised
        """
        url = self.valid_url
        log = self.valid_log.copy()
        log["datetime_utc"] = True

        self.assertRaisesRegex(
            TypeError,
            "log.datetime_utc must be a datetime object",
            send_to_db,
            url,
            log,
        )

    def test_log_input_type(self):
        """
        When log input is not a string, then TypeError is raised
        """
        url = self.valid_url
        log = self.valid_log.copy()
        log["input"] = True

        self.assertRaisesRegex(
            TypeError,
            "log.input must be a string",
            send_to_db,
            url,
            log,
        )

    def test_log_output_type(self):
        """
        When log output is not a string, then TypeError is raised
        """
        url = self.valid_url
        log = self.valid_log.copy()
        log["output"] = True

        self.assertRaisesRegex(
            TypeError,
            "log.output must be a string",
            send_to_db,
            url,
            log,
        )

    def test_log_total_tokens_type(self):
        """
        When log total_tokens is not an integer, then TypeError is raised
        """
        url = self.valid_url
        log = self.valid_log.copy()
        log["total_tokens"] = True

        self.assertRaisesRegex(
            TypeError,
            "log.total_tokens must be an integer",
            send_to_db,
            url,
            log,
        )


if __name__ == "__main__":
    unittest.main()
