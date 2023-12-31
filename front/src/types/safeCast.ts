import { timeOptionConstants } from "@/services/helpers/timeConstants";
import { Order, SortOptions, TimeOption, TagData } from "./logDisplayOptions";

export const safeCastToTimeOption = (
    value: string | null,
): TimeOption | undefined => {
    const urlNames: string[] = timeOptionConstants.map(
        (option) => option.timeOption,
    );
    if (!value) {
        return undefined;
    }
    if (urlNames.includes(value)) return value as TimeOption;
};

export const safeCastToSortOptions = (value: string | null): SortOptions => {
    if (["datetime_utc", "total_tokens", "cost"].includes(value ?? ""))
        return value as SortOptions;
    return "id";
};

export const safeCastToOrder = (value: string | null): Order => {
    if (["asc", "desc"].includes(value ?? "")) return value as Order;
    return "desc";
};

export const safeCastToTagArray = (
    tagArray: { name: string; id: string }[],
): TagData[] => {
    for (const tag of tagArray) {
        if (typeof tag.id !== "string") {
            return [];
        }
        if (typeof tag.name !== "string") {
            return [];
        }
    }
    return tagArray as TagData[];
};
