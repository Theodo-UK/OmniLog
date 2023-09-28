import { useNavigation } from "@/hooks/useNavigation";
import { safeCastToTimeOption } from "@/types/safeCast";
import { useState } from "react";
import { getSelectedTimeFromURL } from "../helpers/getSelectedTimeFromURL";

export const useTimeDropdown = () => {
    const timeOptions = [
        "Last hour",
        "Last day",
        "Last week",
        "Custom interval",
    ];

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const { dateTimeFilter, getStringParam, updateSearchParam } =
        useNavigation();

    const [startDateTime, endDateTime] = [
        getStringParam("startDateTime"),
        getStringParam("endDateTime"),
    ];

    const [selectedTime, setSelectedTime] = useState<string | undefined>(
        getSelectedTimeFromURL(startDateTime, endDateTime, dateTimeFilter),
    );

    const onSelectTime = (newValue: string) => {
        setSelectedTime(newValue);
        if (newValue !== "Custom interval") {
            updateSearchParam({
                dateTimeFilter: safeCastToTimeOption(newValue),
            });
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
