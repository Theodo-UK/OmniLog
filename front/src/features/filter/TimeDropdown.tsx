import { Dropdown } from "@/components/molecules/Dropdown";
import { useNavigation } from "@/hooks/useNavigation";
import { TimeOption } from "@/types/logDisplayOptions";
import { DatePickerPopup } from "./DatePickerPopup";
import { useState } from "react";

export const TimeDropdown = () => {
    const { searchParams, updateSearchParam } = useNavigation();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState<string | null>(searchParams.get("dateTimeFilter"));

    const timeOptions = ["Last hour", "Last day", "Last week", "Filter by time"];
    if (selectedTime == null || !timeOptions.includes(selectedTime)) {
        setSelectedTime("Last hour");
    }

    const onSelectTime = (newValue: string) => {
        setSelectedTime(newValue);
        if (newValue !== "Filter by time") {
            updateSearchParam({ dateTimeFilter: newValue as TimeOption });
        } else {
            setIsPopupOpen(true);
        }
    };

    return (
        <>
            <Dropdown
                options={timeOptions}
                selected={selectedTime ?? "Last hour"}
                onSelect={onSelectTime}
            />
            <DatePickerPopup
                open={isPopupOpen}
                handleClose={() => setIsPopupOpen(false)}
            />
        </>
    );
};
