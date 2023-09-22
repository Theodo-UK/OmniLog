import logging

from omnilogger.pricing.pricing_class import Pricing


def cost_calculator(
    llm: str, model: str, input_tokens: int, output_tokens: int
) -> float | None:
    if input_tokens < 0 or output_tokens < 0:
        return None

    try:
        pricing = Pricing()
    except Exception as err:  # pylint: disable=broad-except
        logging.getLogger("omnilogger cost").warning("Failed to load pricing: %s", err)
        return None
    model_prices = pricing.fetch_model_data(llm, model)
    if model_prices is None:
        return None
    input_cost = model_prices["input"] * input_tokens / 1000
    output_cost = model_prices["output"] * output_tokens / 1000
    return input_cost + output_cost
