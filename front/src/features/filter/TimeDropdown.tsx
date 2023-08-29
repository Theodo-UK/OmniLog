import { Dropdown } from "@/components/molecules/Dropdown";
import { useNavigation } from "@/hooks/useNavigation";
import { TimeOption } from "@/types/filter";

export const TimeDropdown = () => {
    const { searchParams, updateSearchParam } = useNavigation();
    const timeOptions = ["Last hour", "Last day", "Last week"];
    const selectedTime =
        (searchParams.get("dateTimeFilter") as TimeOption) || "Last hour";
    const onTimeSelect = (newValue: string) => {
        updateSearchParam({ dateTimeFilter: newValue as TimeOption });
    };
    return (
        <Dropdown
            options={timeOptions}
            selected={selectedTime}
            onSelect={onTimeSelect}
        />
    );
};
