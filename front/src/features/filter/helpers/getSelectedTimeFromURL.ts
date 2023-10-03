import { TimeOption } from "@/types/logDisplayOptions";

export const getSelectedTimeFromURL = (
    startDateTime: string | undefined,
    endDateTime: string | undefined,
    dateTimeFilter: TimeOption | undefined,
) => {
    const isCustomInterval = startDateTime && endDateTime;
    if (isCustomInterval) return "Custom interval";

    if (!dateTimeFilter) return "Last hour";

    return dateTimeFilter;
};
