from omnilogger.helpers.logger import create_logger
from omnilogger.pricing.pricing_class import Pricing

warn = create_logger("cost_calculator")


def cost_calculator(
    llm: str, model: str, input_tokens: int, output_tokens: int
) -> float | None:
    if input_tokens < 0 or output_tokens < 0:
        warn("input_tokens and output_tokens must be positive")
        return None

    try:
        pricing = Pricing()
    except Exception as err:  # pylint: disable=broad-except
        warn(f"Failed to load pricing: ${err}")
        return None
    model_prices = pricing.fetch_model_data(llm, model)
    if model_prices is None:
        warn(f"Failed to fetch valid model data for {llm} {model}")
        return None
    input_cost = model_prices["input"] * input_tokens / 1000
    output_cost = model_prices["output"] * output_tokens / 1000
    return input_cost + output_cost
