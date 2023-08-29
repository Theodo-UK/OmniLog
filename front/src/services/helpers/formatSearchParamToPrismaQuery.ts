import { llm_logs } from "@prisma/client";

const MS_PER_HOUR = 60 * 60 * 1000;
const MS_PER_DAY = 24 * MS_PER_HOUR;
const MS_PER_WEEK = 7 * MS_PER_DAY;

type Timeframe = {
    lte: Date;
    gte: Date;
};
export type Order = "asc" | "desc";
export type Sort =
    | { id: Order }
    | { datetime_utc: Order }
    | { total_tokens: Order };

export const extractDataFromSearchParam = (searchParams?: URLSearchParams) => {
    const params = new URLSearchParams(searchParams);

    const selectedTime = params.get("dateTimeFilter") || "Last hour";
    const timeframe = stringToTimeframeObject(selectedTime);

    const sortBy = params.get("sortBy") || "datetime_utc";
    const sortOrder = params.get("sortOrder") || "desc";
    const sortObject = stringsToSortObject(
        sortBy as keyof llm_logs,
        sortOrder as Order,
    );
    return { timeframe, sort: sortObject };
};

export const stringToTimeframeObject = (stringTimeframe: string): Timeframe => {
    const now = new Date();
    let numberTimeframe;
    switch (stringTimeframe) {
        case "Last hour":
            numberTimeframe = MS_PER_HOUR;
            break;
        case "Last day":
            numberTimeframe = MS_PER_DAY;
            break;
        case "Last week":
            numberTimeframe = MS_PER_WEEK;
            break;
        default:
            numberTimeframe = MS_PER_HOUR;
    }

    return {
        lte: now,
        gte: new Date(now.getTime() - numberTimeframe),
    };
};

export const stringsToSortObject = (
    key: keyof llm_logs,
    order: Order,
): Sort => {
    switch (key) {
        case "datetime_utc":
            return { datetime_utc: order };
        case "total_tokens":
            return { total_tokens: order };
        default:
            return { id: order };
    }
};
