import "@testing-library/jest-dom";
import { stringToTimeframeObject } from "../helpers/formatSearchParamToPrismaQuery";
import { MS_PER_DAY, MS_PER_HOUR, MS_PER_WEEK } from "../helpers/timeConstants";

describe("stringToTimeframeObject", () => {
    it(
        "When calling with a Last hour, " +
            "then returns the correct timeframe",
        () => {
            const testTimeUrl = "last-hour";
            const timestamp = stringToTimeframeObject(testTimeUrl);
            const difference =
                timestamp.lte.getTime() - timestamp.gte.getTime();
            expect(difference).toEqual(MS_PER_HOUR);
        },
    );
    it(
        "When calling with a Last day, " + "then returns the correct timeframe",
        () => {
            const testTimeUrl = "last-day";

            const timestamp = stringToTimeframeObject(testTimeUrl);
            const difference =
                timestamp.lte.getTime() - timestamp.gte.getTime();
            expect(difference).toEqual(MS_PER_DAY);
        },
    );
    it(
        "When calling with a Last week, " +
            "then returns the correct timeframe",
        () => {
            const testTimeUrl = "last-week";

            const timestamp = stringToTimeframeObject(testTimeUrl);
            const difference =
                timestamp.lte.getTime() - timestamp.gte.getTime();
            expect(difference).toEqual(MS_PER_WEEK);
        },
    );
});
