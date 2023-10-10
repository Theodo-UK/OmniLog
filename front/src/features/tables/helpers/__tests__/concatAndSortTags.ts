import "@testing-library/jest-dom";
import { concatAndSortTags } from "../concatAndSortTags";

describe("concatAndSortTags", () => {
    const tags = [
        { id: "1", name: "tag a" },
        { id: "2", name: "tag c" },
    ];
    const tag = { id: "3", name: "tag b" };
    it("should concat the array of tags with the new tag", () => {
        const result = concatAndSortTags(tags, tag);
        const filteredResult = result.filter((tag) => tag.id === "3");
        expect(filteredResult).toEqual([{ id: "3", name: "tag b" }]);
    });
    it("should sort the array of tags", () => {
        const result = concatAndSortTags(tags, tag);
        expect(result).toEqual([
            { id: "1", name: "tag a" },
            { id: "3", name: "tag b" },
            { id: "2", name: "tag c" },
        ]);
    });
});
