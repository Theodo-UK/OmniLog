import "@testing-library/jest-dom";
import { stringToSearchCondition } from "../helpers/formatSearchParamToPrismaQuery";

describe("stringToSearchCondition", () => {
    it("should return undefined if no string is passed", () => {
        expect(stringToSearchCondition()).toEqual(undefined);
    });
    it("should return an array searching if input or output contains the string argument", () => {
        const searchString = "test";
        const expected = [
            {
                input_string: { contains: searchString },
            },
            {
                output_string: { contains: searchString },
            },
        ];

        expect(stringToSearchCondition(searchString)).toEqual(expected);
    });
});
