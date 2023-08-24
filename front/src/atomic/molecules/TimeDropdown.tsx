import { useRouter, useSearchParams } from "next/navigation";
import { Dropdown } from "../atoms/Dropdown";

export const TimeDropdown = () => {
    const router = useRouter();
    const timeOptions = ["Last hour", "Last day", "Last week"];
    const searchParams = useSearchParams();
    const selectedTime = searchParams.get("dateTimeFilter") || "Last hour";
    const onTimeSelect = () => {
        router.push(`?dateTimeFilter=${selectedTime}`);
    };
    return (
        <Dropdown
            options={timeOptions}
            selected={selectedTime}
            onSelect={onTimeSelect}
        />
    );
};
