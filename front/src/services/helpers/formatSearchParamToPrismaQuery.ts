import { TimeOption } from "@/types/filter";
import { PrismaSort, Timeframe } from "@/types/prismaQueries";
import { Order } from "@/types/sort";
import { llm_logs } from "@prisma/client";

const MS_PER_HOUR = 60 * 60 * 1000;
const MS_PER_DAY = 24 * MS_PER_HOUR;
const MS_PER_WEEK = 7 * MS_PER_DAY;

export const extractDataFromSearchParam = (searchParams?: URLSearchParams) => {
    const params = new URLSearchParams(searchParams);

    const selectedTime =
        (params.get("dateTimeFilter") as TimeOption) || "Last hour";
    const timeframe = stringToTimeframeObject(selectedTime);

    const sortBy = params.get("sortBy") || "datetime_utc";
    const sortOrder = params.get("sortOrder") || "desc";
    const sortObject = stringsToSortObject(
        sortBy as keyof llm_logs,
        sortOrder as Order,
    );
    return { timeframe, sort: sortObject };
};

export const stringToTimeframeObject = (
    stringTimeframe: TimeOption,
): Timeframe => {
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
): PrismaSort => {
    switch (key) {
        case "datetime_utc":
            return { datetime_utc: order };
        case "total_tokens":
            return { total_tokens: order };
        default:
            return { id: order };
    }
};