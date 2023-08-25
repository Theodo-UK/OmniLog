from prisma.types import llm_logsCreateInput


class LogDictKeyError(KeyError):
    def __init__(self):
        # Call the base class constructor with the parameters it needs
        super().__init__(
            "log must be a dictionary with keys:"
            f" {set(llm_logsCreateInput.__annotations__.keys())}"
        )
