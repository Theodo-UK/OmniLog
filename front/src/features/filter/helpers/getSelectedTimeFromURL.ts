const validTimeOptions = ["Last hour", "Last day", "Last week"];

type TimeOption = (typeof validTimeOptions)[number];

export const getSelectedTimeFromURL = (
    startDateTime: string | undefined,
    endDateTime: string | undefined,
    dateTimeFilter: TimeOption | undefined,
) => {
    const isCustomInterval = startDateTime && endDateTime;
    const isValidFilter = validTimeOptions.includes(dateTimeFilter ?? "");

    if (isCustomInterval) return "Custom interval";

    if (!isValidFilter) return "Last hour";
};
