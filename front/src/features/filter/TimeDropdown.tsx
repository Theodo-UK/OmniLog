import { Dropdown } from "@/components/molecules/Dropdown";
import { DatePickerPopup } from "./DatePickerPopup";
import { useTimeDropdown } from "./hooks/useTimeDropdown";

export const TimeDropdown = () => {
    const {
        isPopupOpen,
        setIsPopupOpen,
        timeOptions,
        selectedTime,
        onSelectTime,
    } = useTimeDropdown();

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
