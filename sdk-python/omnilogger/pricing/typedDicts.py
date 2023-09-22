from typing import NotRequired, TypedDict


class ModelData(TypedDict):
    input: float
    output: float
    training: NotRequired[float]
