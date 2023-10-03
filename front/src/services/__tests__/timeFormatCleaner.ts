import { TimeOption } from "@/types/logDisplayOptions";
import { displayNameToTimeOption } from "../helpers/displayNameToTimeOption";

describe("displayNameToTimeOption", () => {
    it('should convert "Last day" to the corresponding TimeOption', () => {
        const result = displayNameToTimeOption("Last day");
        const expected: TimeOption = "last-day";
        expect(result).toEqual(expected);
    });
    it('should convert "Last week" to the corresponding TimeOption', () => {
        const result = displayNameToTimeOption("Last week");
        const expected: TimeOption = "last-week";
        expect(result).toEqual(expected);
    });
    it('should convert "Last hour" to the corresponding TimeOption', () => {
        const result = displayNameToTimeOption("Last hour");
        const expected: TimeOption = "last-hour";
        expect(result).toEqual(expected);
    });
    it("should convert invalid option to undefined", () => {
        const result = displayNameToTimeOption("invalid option");
        const expected = undefined;
        expect(result).toEqual(expected);
    });
});
