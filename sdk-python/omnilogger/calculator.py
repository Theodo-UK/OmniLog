from omnilogger.get_pricing import get_pricing


def cost_calculator(
    llm: str, model: str, input_tokens: int, output_tokens: int
) -> float | None:
    pricing = get_pricing(llm, model)
    if pricing is None:
        return None
    if input_tokens < 0 or output_tokens < 0:
        return None
    return (input_tokens * pricing["input"] + output_tokens * pricing["output"]) / 1000
