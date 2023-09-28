import logging
from typing import Callable


def create_logger(context: str) -> Callable[[str], None]:
    FORMAT = "Omnilogger at %(context)s : %(asctime)s : %(message)s"
    logging.basicConfig(format=FORMAT)
    d = {"context": context}
    logger = logging.getLogger("omnilogger " + context)

    def log(message: str) -> None:
        logger.warning(message, extra=d)

    return log
