import React from "react";
import { Modal } from "@mui/material";
import { CardAtom } from "@/components/atoms/CardAtom";
import { useDateTimePicker } from "./hooks/useDateTimePicker";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en';

type DatePickerPopupProps = {
    open: boolean;
    handleClose: () => void;
};

export const DatePickerPopup = (
    { open, handleClose }: DatePickerPopupProps
) => {
    const {
        startDateTime,
        endDateTime,
        handleStartDateTimeChange,
        handleEndDateTimeChange,
        setCustomRange
    } = useDateTimePicker();

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-custom-datetime-picker"
            aria-describedby="modal-datetime-picker"
        >
            <CardAtom>
                <h2 id="modal-custom-datetime-picker">Enter a custom date range</h2>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                    <p id="modal-startdate-picker">Start date:</p>
                    <DateTimePicker
                        label="Controlled picker"
                        value={startDateTime}
                        onChange={handleStartDateTimeChange}
                        format="DD/MM/YYYY HH:mm"
                    />
                    <p id="modal-enddate-picker">End date:</p>
                    <DateTimePicker
                        label="Controlled picker"
                        value={endDateTime}
                        onChange={handleEndDateTimeChange}
                        format="DD/MM/YYYY HH:mm"
                    />
                </LocalizationProvider>
                <div className=" flex gap-4">
                    <button
                        onClick={handleClose}
                        className=" bg-theodo-grey text-white rounded-md px-4 py-2 text-sm font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={setCustomRange}
                        className=" bg-theodo-dark-green text-white rounded-md px-4 py-2 text-sm font-medium"
                    >
                        Filter Logs
                    </button>
                </div>
            </CardAtom>
        </Modal >
    );
}