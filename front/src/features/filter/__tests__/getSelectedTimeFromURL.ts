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
    it("should return 'Last hour' if dateTimeFilter is not valid", () => {
        const startDateTime = "";
        const endDateTime = "";
        const dateTimeFilter = "this is not valid";
        const result = getSelectedTimeFromURL(
            startDateTime,
            endDateTime,
            dateTimeFilter,
        );
        expect(result).toEqual("Last hour");
    });
});
