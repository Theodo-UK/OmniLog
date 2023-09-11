import { useNavigation } from '@/hooks/useNavigation';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';


export const useDateTimePicker = () => {
    const defaultStartDateTime = dayjs().subtract(1, "M");
    const defaultEndDateTime = dayjs();
    const [startDateTime, setStartDateTime] = useState<Dayjs>(defaultStartDateTime);
    const [endDateTime, setEndDateTime] = useState<Dayjs>(defaultEndDateTime);
    const { updateSearchParam } = useNavigation();

    const setCustomRange = () => {
        if (startDateTime.isAfter(endDateTime)) {
            setStartDateTime(endDateTime);
            setEndDateTime(startDateTime);
        }
        updateSearchParam({ startDateTime: startDateTime.toISOString(), endDateTime: endDateTime.toISOString() });

    };

    const handleStartDateTimeChange = (date: Dayjs | null) => {
        const newDate = date || defaultStartDateTime;
        setStartDateTime(newDate);
    };

    const handleEndDateTimeChange = (date: Dayjs | null) => {
        const newDate = date || defaultEndDateTime;
        setEndDateTime(newDate);
    };

    return {
        startDateTime,
        endDateTime,
        handleStartDateTimeChange,
        handleEndDateTimeChange,
        setCustomRange
    };
}