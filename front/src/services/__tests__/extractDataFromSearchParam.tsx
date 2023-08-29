import "@testing-library/jest-dom";
import { extractDataFromSearchParam } from "../helpers/formatSearchParamToPrismaQuery";

describe("extractDataFromSearchParam", () => {
    it("should return an object with the key as the property and the order as the value", () => {
        const searchParamsString = new URLSearchParams(
            "sortBy=datetime_utc&sortOrder=asc",
        );
        const { timeframe, sort } =
            extractDataFromSearchParam(searchParamsString);

        const difference = timeframe.lte.getTime() - timeframe.gte.getTime();
        expect(difference).toEqual(3600000);
        expect(sort).toEqual({ datetime_utc: "asc" });
    });
});
