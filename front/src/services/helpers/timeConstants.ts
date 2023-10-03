import { TimeOption } from "@/types/logDisplayOptions";

export const MS_PER_HOUR = 60 * 60 * 1000;
export const MS_PER_DAY = 24 * MS_PER_HOUR;
export const MS_PER_WEEK = 7 * MS_PER_DAY;

type TimeOptionConstantType = {
    displayName: string;
    urlName: TimeOption;
    duration: number;
};

export const timeOptionConstants: TimeOptionConstantType[] = [
    {
        displayName: "Last hour",
        urlName: "last-hour",
        duration: MS_PER_HOUR,
    },
    {
        displayName: "Last day",
        urlName: "last-day",
        duration: MS_PER_DAY,
    },
    {
        displayName: "Last week",
        urlName: "last-week",
        duration: MS_PER_WEEK,
    },
];
