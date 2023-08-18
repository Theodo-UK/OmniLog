from omnilog.send_to_db import check_log_type
import unittest
import datetime


class TestLogType(unittest.TestCase):

    valid_log = {
        "datetime_utc": datetime.datetime.utcnow(),
        "input": "What is this?",
        "output": "This is a test log",
        "total_tokens": 5,
    }

    def test_valid_log(self):
        """
        When a correct log is given, then no error is raised
        """
        try:
            check_log_type(self.valid_log)
        except Exception:
            self.fail("log checker raised an error unexpectedly!")

    def test_log_type(self):
        """
        When log is not a dictionary, then TypeError is raised
        """
        log = True

        self.assertRaisesRegex(
            TypeError,
            r"Have you checked your log is a dictionary\?\nlog must be a dictionary with keys: datetime_utc, input, output, total_tokens",
            check_log_type,
            log,
        )

    def test_log_missing_field(self):
        """
        When log is missing a field, then KeyError is raised
        """
        log = {"datetime_utc": datetime.datetime.utcnow()}

        self.assertRaisesRegex(
            KeyError,
            "log must be a dictionary with keys: datetime_utc, input, output, total_tokens",
            check_log_type,
            log,
        )

    def test_log_datetime_type(self):
        """
        When log datetime_utc is not a datetime, then TypeError is raised
        """
        log = self.valid_log.copy()
        log["datetime_utc"] = True

        self.assertRaisesRegex(
            TypeError,
            "log.datetime_utc must be a datetime object",
            check_log_type,
            log,
        )

    def test_log_input_type(self):
        """
        When log input is not a string, then TypeError is raised
        """
        log = self.valid_log.copy()
        log["input"] = True

        self.assertRaisesRegex(
            TypeError,
            "log.input must be a string",
            check_log_type,
            log,
        )

    def test_log_output_type(self):
        """
        When log output is not a string, then TypeError is raised
        """
        log = self.valid_log.copy()
        log["output"] = True

        self.assertRaisesRegex(
            TypeError,
            "log.output must be a string",
            check_log_type,
            log,
        )

    def test_log_total_tokens_type(self):
        """
        When log total_tokens is not an integer, then TypeError is raised
        """
        log = self.valid_log.copy()
        log["total_tokens"] = True

        self.assertRaisesRegex(
            TypeError,
            "log.total_tokens must be an integer",
            check_log_type,
            log,
        )


if __name__ == "__main__":
    unittest.main()
