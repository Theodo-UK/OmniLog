import { Order } from "@/types/logDisplayOptions";
import { llmLogs } from "@prisma/client";
import "@testing-library/jest-dom";
import { stringsToSortObject } from "../helpers/formatSearchParamToPrismaQuery";

describe("stringsToSortObject", () => {
    it.each([
        ["datetime_utc", "asc", { datetime_utc: "asc" }],
        ["total_tokens", "desc", { total_tokens: "desc" }],
        ["cost", "asc", { cost: { sort: "asc", nulls: "last" } }],
    ])(
        "should return an object with %s as the property and %s as the value",
        (llm_key, llm_order, expected) => {
            const testObject = stringsToSortObject(
                llm_key as keyof llmLogs,
                llm_order as Order,
            );
            expect(testObject).toEqual(expected);
        },
    );
});
