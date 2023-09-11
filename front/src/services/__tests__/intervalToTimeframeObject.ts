import "@testing-library/jest-dom";
import { intervalToTimeframeObject } from "../helpers/formatSearchParamToPrismaQuery";
import { MS_PER_HOUR } from "../helpers/timeConstants";


describe("intervalToTimeframeObject", () => {
    it(
        "When calling with two valid strings, " +
        "then returns the correct timeframe",
        () => {
            const timestamp = intervalToTimeframeObject("2021-01-01", "2021-01-02");
            expect(timestamp.gte.getTime()).toEqual(new Date("2021-01-01").getTime());
            expect(timestamp.lte.getTime()).toEqual(new Date("2021-01-02").getTime());
        },
    );
    it(
        "When calling with inverted dates, " +
        "then returns the corrected timeframe",
        () => {
            const timestamp = intervalToTimeframeObject("2021-01-02", "2021-01-01");
            expect(timestamp.gte.getTime()).toEqual(new Date("2021-01-01").getTime());
            expect(timestamp.lte.getTime()).toEqual(new Date("2021-01-02").getTime());
        },
    );
    it(
        "When calling with an invalid date string, " +
        "then returns the timeframe of the last hour",
        () => {
            const timestamp = intervalToTimeframeObject("2021-01-02", "invalid");
            const difference = timestamp.lte.getTime() - timestamp.gte.getTime();
            expect(difference).toEqual(MS_PER_HOUR);
        },
    );
});
