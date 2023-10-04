import { TimeOption } from "@/types/logDisplayOptions";
import "@testing-library/jest-dom";
import { getSelectedTimeFromURL } from "../helpers/getSelectedTimeFromURL";

describe("getSelectedTimeFromURL", () => {
    describe("clean format", () => {
        test.each([
            [
                "startDateTime and endDateTime are defined",
                "Custom interval",
                "2021-08-01T00:00:00.000Z",
                "2021-08-02T00:00:00.000Z",
                undefined,
            ],
            [
                "dateTimeFilter is not defined",
                "Last hour",
                undefined,
                undefined,
                undefined,
            ],
            [
                "dateTimeFilter is last-hour",
                "Last hour",
                undefined,
                undefined,
                "last-hour" as TimeOption,
            ],
            [
                "dateTimeFilter is last-day",
                "Last day",
                undefined,
                undefined,
                "last-day" as TimeOption,
            ],
            [
                "dateTimeFilter is last-week",
                "Last week",
                undefined,
                undefined,
                "last-week" as TimeOption,
            ],
        ])(
            "if %s, then should return %s.",
            (
                condition,
                expected,
                startDateTime,
                endDateTime,
                dateTimeFilter,
            ) => {
                const result = getSelectedTimeFromURL(
                    startDateTime,
                    endDateTime,
                    dateTimeFilter,
                );
                expect(result).toEqual(expected);
            },
        );
    });
});
