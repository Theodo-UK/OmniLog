from prisma import Client
from prisma.types import llm_logsCreateInput

from .input_validation import check_log_type


def send_to_db(log: llm_logsCreateInput) -> None:
    check_log_type(log)

    db = Client()
    try:
        db.connect()
        db.llm_logs.create(log)
        db.disconnect()

    except Exception as e:
        print(e)
        db.disconnect()
