import { Tag, llmLogs } from "@prisma/client";

export type LogDisplayOptions = {
    sortBy?: SortOptions;
    sortOrder?: Order;
    dateTimeFilter?: TimeOption;
    search?: string;
    startDateTime?: string;
    endDateTime?: string;
};

export type TimeOption = "last-hour" | "last-day" | "last-week";

export type Order = "asc" | "desc";
export type SortOptions = "datetime_utc" | "total_tokens" | "id" | "cost";

export type LogData = llmLogs & { tags: Tag[] };
export type LogDataArray = LogData[];
