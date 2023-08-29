import { Order, SortOptions } from "@/types/sort";

export type FilterOptions = {
    sortBy?: SortOptions;
    sortOrder?: Order;
    dateTimeFilter?: TimeOption;
};

export type TimeOption = "Last hour" | "Last day" | "Last week";
