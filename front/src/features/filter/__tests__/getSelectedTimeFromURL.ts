import { TimeOption } from "@/types/logDisplayOptions";
import "@testing-library/jest-dom";
import { getSelectedTimeFromURL } from "../helpers/getSelectedTimeFromURL";

describe("getSelectedTimeFromURL", () => {
    describe("clean format", () => {
        test.each([
            [
                'should return "Custom interval" if startDateTime and endDateTime are defined',
                "2021-08-01T00:00:00.000Z",
                "2021-08-02T00:00:00.000Z",
                undefined,
                "Custom interval",
            ],
            [
                "should return 'Last hour' if dateTimeFilter is not defined",
                undefined,
                undefined,
                undefined,
                "Last hour",
            ],
            [
                "should return 'Last hour' if dateTimeFilter is last-hour",
                undefined,
                undefined,
                "last-hour" as TimeOption,
                "Last hour",
            ],
            [
                "should return 'Last day' if dateTimeFilter is last-day",
                undefined,
                undefined,
                "last-day" as TimeOption,
                "Last day",
            ],
            [
                "should return 'Last week' if dateTimeFilter is last-week",
                undefined,
                undefined,
                "last-week" as TimeOption,
                "Last week",
            ],
        ])(
            "%s",
            (
                testName,
                startDateTime,
                endDateTime,
                dateTimeFilter,
                expected,
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
