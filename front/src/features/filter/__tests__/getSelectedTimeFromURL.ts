import "@testing-library/jest-dom";
import { getSelectedTimeFromURL } from "../helpers/getSelectedTimeFromURL";

describe("getSelectedTimeFromURL", () => {
    it("should return 'Custom interval' if startDateTime and endDateTime are defined", () => {
        const startDateTime = "2021-08-01T00:00:00.000Z";
        const endDateTime = "2021-08-02T00:00:00.000Z";
        const dateTimeFilter = undefined;
        const result = getSelectedTimeFromURL(
            startDateTime,
            endDateTime,
            dateTimeFilter,
        );
        expect(result).toEqual("Custom interval");
    });
    it("should return 'Last hour' if dateTimeFilter is not defined", () => {
        const startDateTime = undefined;
        const endDateTime = undefined;
        const dateTimeFilter = undefined;
        const result = getSelectedTimeFromURL(
            startDateTime,
            endDateTime,
            dateTimeFilter,
        );
        expect(result).toEqual("Last hour");
    });
    it("should return 'Last hour' if dateTimeFilter is Last hour", () => {
        const startDateTime = undefined;
        const endDateTime = undefined;
        const dateTimeFilter = "Last hour";
        const result = getSelectedTimeFromURL(
            startDateTime,
            endDateTime,
            dateTimeFilter,
        );
        expect(result).toEqual("Last hour");
    });
    it("should return 'Last day' if dateTimeFilter is Last day", () => {
        const startDateTime = undefined;
        const endDateTime = undefined;
        const dateTimeFilter = "Last day";
        const result = getSelectedTimeFromURL(
            startDateTime,
            endDateTime,
            dateTimeFilter,
        );
        expect(result).toEqual("Last day");
    });
    it("should return 'Last week' if dateTimeFilter is Last week", () => {
        const startDateTime = undefined;
        const endDateTime = undefined;
        const dateTimeFilter = "Last week";
        const result = getSelectedTimeFromURL(
            startDateTime,
            endDateTime,
            dateTimeFilter,
        );
        expect(result).toEqual("Last week");
    });
});
