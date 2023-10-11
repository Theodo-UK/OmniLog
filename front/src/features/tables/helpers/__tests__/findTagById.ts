import "@testing-library/jest-dom";
import { findTagById } from "../tagArrayManagement";

describe("findTagById", () => {
    const tags = [
        { id: "1", name: "tag1" },
        { id: "2", name: "tag2" },
    ];

    it("when the id is valid, should return the tag with the given id", () => {
        const tagId = "2";
        const tag = findTagById(tags, tagId);
        expect(tag).toEqual(tags[1]);
    });

    it("should throw an error if the tag is not found", () => {
        const tagId = "3";
        expect(() => findTagById(tags, tagId)).toThrow(
            "Failed to find tag of id 3 among the given tags.",
        );
    });
});
