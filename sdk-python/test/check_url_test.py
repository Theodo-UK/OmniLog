from omnilogger.input_validation import check_url_type
import unittest


class TestURLType(unittest.TestCase):
    def test_valid_url(self):
        """
        When a correct url is given, then no error is raised
        """
        valid_url = "mongodb://localhost:27017/"
        try:
            check_url_type(valid_url)
        except Exception:
            self.fail("url checker raised an error unexpectedly!")

    def test_url(self):
        """
        When url is not a string, then TypeError is raised
        """
        url = True

        self.assertRaisesRegex(
            TypeError,
            "Have you checked your url connection string is correct?",
            check_url_type,
            url,
        )


if __name__ == "__main__":
    unittest.main()
