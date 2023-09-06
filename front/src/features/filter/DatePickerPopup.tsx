import React from "react";
import { Modal } from "@mui/material";
import { CardAtom } from "@/components/atoms/CardAtom";
import { useDateTimePicker } from "./hooks/useDateTimePicker";
import { DateTimePicker } from "@mui/x-date-pickers";

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
                <h2 id="modal-custom-datetime-picker">Custom Date Range</h2>
                <p id="modal-startdate-picker">Start date:</p>
                <DateTimePicker
                    label="Controlled picker"
                    value={startDateTime}
                    onChange={handleStartDateTimeChange}
                />
                <p id="modal-enddate-picker">End date:</p>
                <DateTimePicker
                    label="Controlled picker"
                    value={endDateTime}
                    onChange={handleEndDateTimeChange}
                />
                <div className=" flex gap-4">
                    <button
                        onClick={handleClose}
                        className=" bg-theodo-grey text-black rounded-md px-4 py-2 text-sm font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={setCustomRange}
                        className=" bg-theodo-green text-black rounded-md px-4 py-2 text-sm font-medium"
                    >
                        Filter Logs
                    </button>
                </div>
            </CardAtom>
        </Modal>
    );
}