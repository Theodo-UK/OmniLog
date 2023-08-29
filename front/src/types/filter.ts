import { Order, SortOptions } from "@/types/sort";

export type FilterOptions = {
    sortBy?: SortOptions;
    sortOrder?: Order;
    dateTimeFilter?: TimeOptions;
};

export type TimeOptions = "Last hour" | "Last day" | "Last week";
