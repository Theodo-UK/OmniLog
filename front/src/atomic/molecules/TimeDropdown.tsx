"use client";
import { useSearchParams } from "next/navigation";
import { Dropdown } from "../atoms/Dropdown";

export const TimeDropdown = () => {
    const timeOptions = ["Last hour", "Last day", "Last week", "All times"];
    const searchParams = useSearchParams();
    const selectedTime = searchParams.get("dateTimeFilter") || "Last hour";
    const onTimeSelect = () => {};
    return (
        <Dropdown
            options={timeOptions}
            selected={selectedTime}
            onSelect={onTimeSelect}
        />
    );
};
