import { Dropdown } from "@/components/molecules/Dropdown";
import { useNavigation } from "@/hooks/useNavigation";
import { TimeOption } from "@/types/logDisplayOptions";
import { DatePickerPopup } from "./DatePickerPopup";
import { useState } from "react";

export const TimeDropdown = () => {
    const { searchParams, updateSearchParam } = useNavigation();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState<string | null>(searchParams.get("dateTimeFilter"));

    const timeOptions = ["Last hour", "Last day", "Last week", "Custom interval"];
    if (selectedTime !== "Filter by time" && !timeOptions.includes(selectedTime ?? "")) {
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

    return (
        <>
            <Dropdown
                options={timeOptions}
                selected={selectedTime ?? "Filter by time"}
                onSelect={onSelectTime}
            />
            <DatePickerPopup
                open={isPopupOpen}
                handleClose={() => setIsPopupOpen(false)}
            />
        </>
    );
};
