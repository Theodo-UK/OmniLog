from prisma import Client
from prisma.types import llmLogsCreateInput

from .input_validation import check_log_type


def send_to_db(log: llmLogsCreateInput) -> None:
    check_log_type(log)

    db = Client()
    try:
        db.connect()
        db.llmLogs.create(log)
        db.disconnect()

    except Exception as e:
        print(e)
        db.disconnect()
