import "@testing-library/jest-dom";
import { stringsToSortObject } from "../helpers/formatSearchParamToPrismaQuery";

describe("stringsToSortObject", () => {
    it("should return an object with the key as the property and the order as the value", () => {
        const llm_key = "datetime_utc";
        const llm_order = "asc";
        const testObject = stringsToSortObject(llm_key, llm_order);
        expect(testObject).toEqual({ datetime_utc: "asc" });
    });
    it("should return an object with the key as the property and the order as the value", () => {
        const llm_key = "total_tokens";
        const llm_order = "desc";
        const testObject = stringsToSortObject(llm_key, llm_order);
        expect(testObject).toEqual({ total_tokens: "desc" });
    });
});