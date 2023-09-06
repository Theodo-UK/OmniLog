import { Dropdown } from "@/components/molecules/Dropdown";
import { useNavigation } from "@/hooks/useNavigation";
import { TimeOption } from "@/types/logDisplayOptions";
import { DatePickerPopup } from "./DatePickerPopup";
import { useState } from "react";

export const TimeDropdown = () => {
    const { searchParams, updateSearchParam } = useNavigation();
    const timeOptions = ["Last hour", "Last day", "Last week", "Custom range"];
    const [selectedTime, setSelectedTime] = useState<string | null>(searchParams.get("dateTimeFilter"));
    if (selectedTime == null || !timeOptions.includes(selectedTime))
        setSelectedTime("Last hour");
    const onTimeSelect = (newValue: string) => {
        if (timeOptions.includes(newValue))
            updateSearchParam({ dateTimeFilter: newValue as TimeOption });
    };
    const cancelCustomRangePicker = () => {
        setSelectedTime("Last hour");
    };
    return (
        <>
            <Dropdown
                options={timeOptions}
                selected={selectedTime ?? "Last hour"}
                onSelect={onTimeSelect}
            />
            <DatePickerPopup
                open={selectedTime === "Custom range"}
                handleClose={cancelCustomRangePicker}
            />
        </>
    );
};
