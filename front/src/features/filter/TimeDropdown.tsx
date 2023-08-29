import { Dropdown } from "@/components/molecules/Dropdown";
import { useNavigation } from "@/hooks/useNavigation";
import { TimeOption } from "@/types/logDisplayOptions";

export const TimeDropdown = () => {
    const { searchParams, updateSearchParam } = useNavigation();
    const timeOptions = ["Last hour", "Last day", "Last week"];
    let selectedTime = searchParams.get("dateTimeFilter");
    if (!selectedTime || !timeOptions.includes(selectedTime)) {
        selectedTime = "Last hour";
    }
    const onTimeSelect = (newValue: string) => {
        if (timeOptions.includes(newValue))
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
