import { llm_logs } from "@prisma/client";

export type LogDisplayOptions = {
    sortBy?: SortOptions;
    sortOrder?: Order;
    dateTimeFilter?: TimeOption;
};

export type TimeOption = "Last hour" | "Last day" | "Last week";

export type Order = "asc" | "desc";
export type SortOptions = "datetime_utc" | "total_tokens" | "id";

export type LogData = llm_logs;
export type LogDataArray = LogData[];
