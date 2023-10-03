import { useNavigation } from "@/hooks/useNavigation";
import { useState } from "react";
import { getSelectedTimeFromURL } from "../helpers/getSelectedTimeFromURL";
import { timeFormatCleaner } from "@/services/helpers/timeFormatCleaner";
import { timeOptionConstants } from "@/services/helpers/timeConstants";

export const useTimeDropdown = () => {
    let timeOptions = timeOptionConstants.map((option) => option.displayName);
    timeOptions = timeOptions.concat("Custom interval");

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
        const cleanTime = timeFormatCleaner(newValue);
        setSelectedTime(newValue);
        if (newValue !== "Custom interval") {
            updateSearchParam({
                dateTimeFilter: cleanTime,
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
