import { useNavigation } from "@/hooks/useNavigation";
import { safeCastToTimeOption } from "@/types/safeCast";
import { useState } from "react";

export const useTimeDropdown = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const timeOptions = ["Last hour", "Last day", "Last week", "Custom interval"];

    const { dateTimeFilter, getStringParam, updateSearchParam } = useNavigation();
    const [selectedTime, setSelectedTime] = useState<string | undefined>(dateTimeFilter);
    const [startDateTime, endDateTime] = [getStringParam("startDateTime"), getStringParam("endDateTime")];

    const isCustomInterval = startDateTime && endDateTime;
    const isValidFilter = timeOptions.includes(dateTimeFilter ?? "");
    if (isCustomInterval) setSelectedTime("Custom interval");
    else if (!isValidFilter) setSelectedTime("Last hour");

    const onSelectTime = (newValue: string) => {
        setSelectedTime(newValue);
        if (newValue !== "Custom interval") {
            updateSearchParam({ dateTimeFilter: safeCastToTimeOption(newValue) });
        } else {
            setIsPopupOpen(true);
        }
    };

    return {
        isPopupOpen,
        setIsPopupOpen,
        timeOptions,
        selectedTime,
        onSelectTime,
    };
};
