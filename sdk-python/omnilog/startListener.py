import logging
import sys


def startListener():
    logging.basicConfig(
        level=logging.DEBUG,
        format='%(asctime)s:%(levelname)s:%(name)s:%(message)s',
        filename="out.log",
        filemode='a'
    )

    logHandler = logging.StreamHandler()
    logFormatter = logging.Formatter(fmt='From Omnilog: %(message)s')
    logHandler.setFormatter(logFormatter)

    logger = logging.getLogger()
    logger.handlers = [logHandler]

    sl = StreamToLogger(logger, logging.INFO)
    sys.stdout = sl
    sl = StreamToLogger(logger, logging.ERROR)
    sys.stderr = sl


class StreamToLogger(object):
    """
    Fake file-like stream object that redirects writes to a logger instance.
    """
    def __init__(self, logger, log_level=logging.INFO):
        self.logger = logger
        self.log_level = log_level
        self.linebuf = ''

    def write(self, buf):
        temp_linebuf = self.linebuf + buf
        self.linebuf = ''
        for line in temp_linebuf.splitlines(True):
            # From the io.TextIOWrapper docs:
            #   On output, if newline is None, any '\n' characters written
            #   are translated to the system default line separator.
            # By default sys.stdout.write() expects '\n' newlines and then
            # translates them so this is still cross platform.
            if line[-1] == '\n':
                self.logger.log(self.log_level, line.rstrip())
            else:
                self.linebuf += line

    def flush(self):
        if self.linebuf != '':
            self.logger.log(self.log_level, self.linebuf.rstrip())
        self.linebuf = ''
