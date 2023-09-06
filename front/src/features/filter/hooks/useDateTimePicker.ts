import { useNavigation } from '@/hooks/useNavigation';
import { useState } from 'react';

const MONTH_IN_MS = 2592000000;

export const useDateTimePicker = () => {
    const defaultStartDateTime = new Date((new Date()).getTime() - MONTH_IN_MS);
    const defaultEndDateTime = new Date();
    const [startDateTime, setStartDateTime] = useState<Date>(defaultStartDateTime);
    const [endDateTime, setEndDateTime] = useState<Date>(defaultEndDateTime);
    const { updateSearchParam } = useNavigation();

    const setCustomRange = () => {
        if (startDateTime > endDateTime) {
            setStartDateTime(endDateTime);
            setEndDateTime(startDateTime);
        }
        updateSearchParam({ startDateTime: startDateTime.toISOString(), endDateTime: endDateTime.toISOString() });

    };

    const handleStartDateTimeChange = (date: Date | null) => {
        const newDate = date || defaultStartDateTime;
        setStartDateTime(newDate);
    };

    const handleEndDateTimeChange = (date: Date | null) => {
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