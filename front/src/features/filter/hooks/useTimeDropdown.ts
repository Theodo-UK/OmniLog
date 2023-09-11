import { useNavigation } from "@/hooks/useNavigation";
import { TimeOption, timeOptionArry } from "@/types/logDisplayOptions";
import { useState } from "react";

export const useTimeDropdown = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const timeOptions = (timeOptionArry as string[]).concat(["Custom interval"]);

    const { searchParams, updateSearchParam } = useNavigation();
    const [selectedTime, setSelectedTime] = useState<string | null>(searchParams.get("dateTimeFilter"));
    const [startDateTime, endDateTime] = [searchParams.get("startDateTime"), searchParams.get("endDateTime")];
    const isCustomInterval = startDateTime && endDateTime;

    const isTimeFiltered = timeOptions.includes(selectedTime ?? "") || isCustomInterval;
    if (!isTimeFiltered && selectedTime !== "Filter by time") {
        setSelectedTime("Filter by time");
    }

    const onSelectTime = (newValue: string) => {
        setSelectedTime(newValue);
        if (newValue !== "Custom interval") {
            updateSearchParam({ dateTimeFilter: newValue as TimeOption });
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
