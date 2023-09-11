import React from "react";
import { Modal } from "@mui/material";
import { CardAtom } from "@/components/atoms/CardAtom";
import { useDateTimePicker } from "./hooks/useDateTimePicker";
import 'dayjs/locale/en';
import { DateTimePicker } from "@/components/atoms/DateTimePicker";
import { Button } from "@/components/atoms/Button";

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

    const triggerFilter = () => {
        setCustomRange();
        handleClose();
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-custom-datetime-picker"
            aria-describedby="modal-datetime-picker"
            className="flex items-center justify-center min-h-screen sm:px-6 lg:px-16"
        >
            <div className="lg:w-3/6">
                <CardAtom>
                    <h2 className="text-lg font-semibold text-theodo-blue-dark text-center">
                        Enter a custom date range
                    </h2>
                    <DateTimePicker
                        label="Start date"
                        dateTime={startDateTime}
                        handleDateTimeChange={handleStartDateTimeChange}
                    />
                    <DateTimePicker
                        label="End date"
                        dateTime={endDateTime}
                        handleDateTimeChange={handleEndDateTimeChange}
                    />
                    <div className=" flex gap-4">
                        <Button onClick={handleClose} colour="grey">
                            Cancel
                        </Button>
                        <Button onClick={triggerFilter} colour="green">
                            Filter Logs
                        </Button>
                    </div>
                </CardAtom>
            </div>
        </Modal >
    );
}