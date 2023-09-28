import { Order, SortOptions, TimeOption } from "./logDisplayOptions";

export const safeCastToTimeOption = (
    value: string | null,
): TimeOption | undefined => {
    if (["Last hour", "Last day", "Last week"].includes(value ?? ""))
        return value as TimeOption;
    return undefined;
};

export const safeCastToSortOptions = (value: string | null): SortOptions => {
    if (["datetime_utc", "total_tokens"].includes(value ?? ""))
        return value as SortOptions;
    return "id";
};

export const safeCastToOrder = (value: string | null): Order => {
    if (["asc", "desc"].includes(value ?? "")) return value as Order;
    return "desc";
};
