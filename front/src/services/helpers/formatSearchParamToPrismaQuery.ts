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
import { MS_PER_HOUR, timeOptionConstants } from "./timeConstants";

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
    let numberTimeframe = MS_PER_HOUR;
    const matchingTimeOption = timeOptionConstants.filter(
        (option) => stringTimeOption === option.timeOption,
    );

    if (matchingTimeOption[0]) {
        numberTimeframe = matchingTimeOption[0].duration;
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
        case "cost":
            return { cost: { sort: order, nulls: "last" } };
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
