import { Project, Tag, llmLogs } from "@prisma/client";

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

export type ProjectData = Project;

export type TagData = Tag;

export type LogData = llmLogs & { tags: TagData[] } & { project: ProjectData };
export type LogDataArray = LogData[];
