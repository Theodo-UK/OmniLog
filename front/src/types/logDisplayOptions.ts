import { llmLogs } from "@prisma/client";

export type LogDisplayOptions = {
    sortBy?: SortOptions;
    sortOrder?: Order;
    dateTimeFilter?: TimeOption;
    search?: string;
    startDateTime?: string;
    endDateTime?: string
};

export type TimeOption = "Last hour" | "Last day" | "Last week"

export type Order = "asc" | "desc";
export type SortOptions = "datetime_utc" | "total_tokens" | "id";

export type LogData = llmLogs;
export type LogDataArray = LogData[];
