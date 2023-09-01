import "@testing-library/jest-dom";
import { extractDataFromSearchParam } from "../helpers/formatSearchParamToPrismaQuery";

describe("extractDataFromSearchParam", () => {
    it("should return an object with the default values if no search params are passed", () => {
        const { timeframe, sort, searchCondition } =
            extractDataFromSearchParam();

        const difference = timeframe.lte.getTime() - timeframe.gte.getTime();
        expect(difference).toEqual(3600000);
        expect(sort).toEqual({ datetime_utc: "desc" });
        expect(searchCondition).toEqual(undefined);
    });

    it("should return three non-default objects if parameters are defined", () => {
        const searchParamsString = new URLSearchParams(
            "sortBy=total_tokens&sortOrder=asc&search=first&dateTimeFilter=Last+week",
        );
        const { timeframe, sort, searchCondition } =
            extractDataFromSearchParam(searchParamsString);

        const difference = timeframe.lte.getTime() - timeframe.gte.getTime();
        expect(difference).toEqual(604800000);
        expect(sort).toEqual({ total_tokens: "asc" });
        expect(searchCondition).toEqual([
            {
                input_string: {
                    contains: "first",
                },
            },
            {
                output_string: {
                    contains: "first",
                },
            },
        ]);
    });
});
