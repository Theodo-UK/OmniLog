import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateTimePicker as Picker } from "@mui/x-date-pickers"
import { Dayjs } from "dayjs";

type DateTimePickerProps = {
    label: string;
    dateTime: Dayjs;
    handleDateTimeChange: (date: Dayjs | null) => void;
}

export const DateTimePicker = ({ label, dateTime, handleDateTimeChange }: DateTimePickerProps) => {
    const id = "modal-picker-" + label.replace(" ", "-").toLowerCase();
    const formattedLabel = label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
            <p id={id}>{formattedLabel}:</p>
            <Picker
                label="Controlled picker"
                value={dateTime}
                onChange={handleDateTimeChange}
                format="DD/MM/YYYY HH:mm"
            />
        </ LocalizationProvider>
    )
}
