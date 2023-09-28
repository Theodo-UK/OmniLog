import "@testing-library/jest-dom";
import { convertSearchParamToPrismaConditions } from "../helpers/formatSearchParamToPrismaQuery";
import { MS_PER_HOUR, MS_PER_WEEK } from "../helpers/timeConstants";

describe("extractDataFromSearchParam", () => {
    it("should return an object with the default values if no search params are passed", () => {
        const { timeframe, sort, searchCondition } =
            convertSearchParamToPrismaConditions();

        const difference = timeframe.lte.getTime() - timeframe.gte.getTime();
        expect(difference).toEqual(MS_PER_HOUR);
        expect(sort).toEqual({ id: "desc" });
        expect(searchCondition).toEqual(undefined);
    });

    it("should return three non-default objects if parameters are defined", () => {
        const searchParamsString = new URLSearchParams(
            "sortBy=total_tokens&sortOrder=asc&search=first&dateTimeFilter=Last+week",
        );
        const { timeframe, sort, searchCondition } =
            convertSearchParamToPrismaConditions(searchParamsString);

        const difference = timeframe.lte.getTime() - timeframe.gte.getTime();
        expect(difference).toEqual(MS_PER_WEEK);
        expect(sort).toEqual({ total_tokens: "asc" });
        expect(searchCondition).toEqual([
            {
                input_string: {
                    contains: "first",
                    mode: "insensitive",
                },
            },
            {
                output_string: {
                    contains: "first",
                    mode: "insensitive",
                },
            },
        ]);
    });
});
