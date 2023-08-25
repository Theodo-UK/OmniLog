import { useRouter, useSearchParams } from "next/navigation";
import { Dropdown } from "../atoms/Dropdown";

export const TimeDropdown = () => {
    const router = useRouter();
    const timeOptions = ["Last hour", "Last day", "Last week"];
    const searchParams = useSearchParams();
    const selectedTime = searchParams.get("dateTimeFilter") || "Last hour";
    const onTimeSelect = (newValue: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("dateTimeFilter", newValue);
        router.push(`?${params.toString()}`);
    };
    return (
        <Dropdown
            options={timeOptions}
            selected={selectedTime}
            onSelect={onTimeSelect}
        />
    );
};
