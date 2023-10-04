import { useNavigation } from "@/hooks/useNavigation";
import { displayNameToTimeOption } from "@/services/helpers/displayNameToTimeOption";
import { timeOptionConstants } from "@/services/helpers/timeConstants";
import { useState } from "react";
import { getSelectedTimeFromURL } from "../helpers/getSelectedTimeFromURL";

export const useTimeDropdown = () => {
    const timeOptions = timeOptionConstants
        .map((option) => option.displayName)
        .concat("Custom interval");

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
        const cleanTime = displayNameToTimeOption(newValue);
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
