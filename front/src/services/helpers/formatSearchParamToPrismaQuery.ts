import {
    LogDisplayOptions,
    Order,
    TimeOption,
} from "@/types/logDisplayOptions";
import {
    safeCastToOrder,
    safeCastToSortOptions,
    safeCastToTimeOption,
} from "@/types/safeCast";
import { llmLogs } from "@prisma/client";
import {
    PrismaSort,
    SearchCondition,
    Timeframe,
} from "../types/queryConditions";
import { MS_PER_DAY, MS_PER_HOUR, MS_PER_WEEK } from "./timeConstants";

export const convertSearchParamToPrismaConditions = (
    searchParams?: URLSearchParams,
) => {
    const data = extractDataFromSearchParams(searchParams);

    let timeframe: Timeframe;
    if (data.startDateTime && data.endDateTime)
        timeframe = intervalToTimeframeObject(
            data.startDateTime,
            data.endDateTime,
        );
    else timeframe = stringToTimeframeObject(data.dateTimeFilter);

    const sortObject = stringsToSortObject(data.sortBy, data.sortOrder);

    const searchCondition = stringToSearchCondition(data.search);

    return { timeframe, sort: sortObject, searchCondition };
};

const extractDataFromSearchParams = (
    searchParams?: URLSearchParams,
): LogDisplayOptions => {
    const params = new URLSearchParams(searchParams);
    const data: LogDisplayOptions = {
        dateTimeFilter: safeCastToTimeOption(params.get("dateTimeFilter")),
        startDateTime: params.get("startDateTime") || undefined,
        endDateTime: params.get("endDateTime") || undefined,
        sortBy: safeCastToSortOptions(params.get("sortBy")),
        sortOrder: safeCastToOrder(params.get("sortOrder")),
        search: params.get("search") || undefined,
    };
    return data;
};

export const stringToTimeframeObject = (
    stringTimeOption?: TimeOption,
): Timeframe => {
    const now = new Date();
    let numberTimeframe;
    switch (stringTimeOption) {
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

export const intervalToTimeframeObject = (
    startDateString: string,
    endDateString: string,
): Timeframe => {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        const now = new Date();
        return {
            lte: now,
            gte: new Date(now.getTime() - MS_PER_HOUR),
        };
    }

    if (startDate > endDate) {
        return {
            lte: startDate,
            gte: endDate,
        };
    }
    return {
        lte: endDate,
        gte: startDate,
    };
};

export const stringsToSortObject = (
    key?: keyof llmLogs,
    order?: Order,
): PrismaSort => {
    key = key || "datetime_utc";
    order = order || "desc";

    switch (key) {
        case "datetime_utc":
            return { datetime_utc: order };
        case "total_tokens":
            return { total_tokens: order };
        default:
            return { id: order };
    }
};

export const stringToSearchCondition = (
    searchString?: string,
): SearchCondition => {
    if (searchString)
        return [
            {
                input_string: { contains: searchString, mode: "insensitive" },
            },
            {
                output_string: { contains: searchString, mode: "insensitive" },
            },
        ];
    else return undefined;
};
