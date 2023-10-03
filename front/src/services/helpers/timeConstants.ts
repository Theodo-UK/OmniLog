import { TimeOption } from "@/types/logDisplayOptions";

export const MS_PER_HOUR = 60 * 60 * 1000;
export const MS_PER_DAY = 24 * MS_PER_HOUR;
export const MS_PER_WEEK = 7 * MS_PER_DAY;

type TimeOptionConstantType = {
    timeOption: TimeOption;
    displayName: string;
    duration: number;
};

export const timeOptionConstants: TimeOptionConstantType[] = [
    {
        timeOption: "last-hour",
        displayName: "Last hour",
        duration: MS_PER_HOUR,
    },
    {
        timeOption: "last-day",
        displayName: "Last day",
        duration: MS_PER_DAY,
    },
    {
        timeOption: "last-week",
        displayName: "Last week",
        duration: MS_PER_WEEK,
    },
];
