import datetime
import unittest

from prisma.types import llm_logsCreateInput

from omnilogger.errors import LogDictKeyError
from omnilogger.input_validation import check_log_type


class TestLogType(unittest.TestCase):
    valid_log = llm_logsCreateInput(
        datetime_utc=datetime.datetime.utcnow(),
        input_string="What is this?",
        output_string="This is a test log",
        total_tokens=5,
        cost=0.1,
    )

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
            AssertionError,
            LogDictKeyError().args[0],  # error message
            check_log_type,
            log,
        )

    def test_log_missing_field(self):
        """
        When log is missing a field, then KeyError is raised
        """
        invalid_log = llm_logsCreateInput(
            datetime_utc=datetime.datetime.utcnow(),
        )

        self.assertRaisesRegex(
            AssertionError,
            LogDictKeyError().args[0],  # error message
            check_log_type,
            invalid_log,
        )

    def test_log_datetime_type(self):
        """
        When log datetime_utc is not a datetime, then TypeError is raised
        """
        log = self.valid_log.copy()
        log["datetime_utc"] = True

        self.assertRaisesRegex(
            AssertionError,
            "log.datetime_utc must be a datetime object",
            check_log_type,
            log,
        )

    def test_log_input_type(self):
        """
        When log input is not a string, then AssertionError is raised
        """
        log = self.valid_log.copy()
        log["input_string"] = True

        self.assertRaisesRegex(
            AssertionError,
            "log.input_string must be a string",
            check_log_type,
            log,
        )

    def test_log_output_type(self):
        """
        When log output is not a string, then AssertionError is raised
        """
        log = self.valid_log.copy()
        log["output_string"] = True

        self.assertRaisesRegex(
            AssertionError,
            "log.output_string must be a string",
            check_log_type,
            log,
        )

    def test_log_total_tokens_type(self):
        """
        When log total_tokens is not an integer, then AssertionError is raised
        """
        log = self.valid_log.copy()
        log["total_tokens"] = True

        self.assertRaisesRegex(
            AssertionError,
            "log.total_tokens must be an integer",
            check_log_type,
            log,
        )

    def test_log_cost_type(self):
        """
        When log cost is not a float, then AssertionError is raised
        """
        log = self.valid_log.copy()
        log["cost"] = True

        self.assertRaisesRegex(
            AssertionError,
            "log.cost must be a float",
            check_log_type,
            log,
        )


if __name__ == "__main__":
    unittest.main()
