import "@testing-library/jest-dom";
import { intervalToTimeframeObject } from "../helpers/formatSearchParamToPrismaQuery";
import { MS_PER_HOUR } from "../helpers/timeConstants";

describe("intervalToTimeframeObject", () => {
    const firstDateString = "2021-01-01";
    const secondDateString = "2021-01-02";
    const invalidDateString = "invalid";

    it(
        "When calling with two valid strings, " +
        "then returns the correct timeframe",
        () => {
            const timestamp = intervalToTimeframeObject(firstDateString, secondDateString);
            expect(timestamp.gte.getTime()).toEqual(new Date(firstDateString).getTime());
            expect(timestamp.lte.getTime()).toEqual(new Date(secondDateString).getTime());
        },
    );
    it(
        "When calling with inverted dates, " +
        "then returns the corrected timeframe",
        () => {
            const timestamp = intervalToTimeframeObject(secondDateString, firstDateString);
            expect(timestamp.gte.getTime()).toEqual(new Date(firstDateString).getTime());
            expect(timestamp.lte.getTime()).toEqual(new Date(secondDateString).getTime());
        },
    );
    it(
        "When calling with an invalid date string, " +
        "then returns the timeframe of the last hour",
        () => {
            const timestamp = intervalToTimeframeObject(secondDateString, invalidDateString);
            const difference = timestamp.lte.getTime() - timestamp.gte.getTime();
            expect(difference).toEqual(MS_PER_HOUR);
        },
    );
});
