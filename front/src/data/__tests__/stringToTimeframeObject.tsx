import "@testing-library/jest-dom";
import { stringToTimeframeObject } from "../helpers/formatSearchParamToPrismaQuery";

describe("stringToTimeframeObject", () => {
    it(
        "When calling with a Last hour, " +
            "then returns the correct timeframe",
        () => {
            const timestamp = stringToTimeframeObject("Last hour");
            const difference =
                timestamp.lte.getTime() - timestamp.gte.getTime();
            expect(difference).toEqual(3600000);
        },
    );
    it(
        "When calling with a Last day, " + "then returns the correct timeframe",
        () => {
            const timestamp = stringToTimeframeObject("Last day");
            const difference =
                timestamp.lte.getTime() - timestamp.gte.getTime();
            expect(difference).toEqual(86400000);
        },
    );
    it(
        "When calling with a Last week, " +
            "then returns the correct timeframe",
        () => {
            const timestamp = stringToTimeframeObject("Last week");
            const difference =
                timestamp.lte.getTime() - timestamp.gte.getTime();
            expect(difference).toEqual(604800000);
        },
    );
    it(
        "When calling with a unexpected string, " +
            "then returns the timeframe corresponding to Last hour",
        () => {
            const timestamp = stringToTimeframeObject("unexpected string");
            const difference =
                timestamp.lte.getTime() - timestamp.gte.getTime();
            expect(difference).toEqual(3600000);
        },
    );
});
