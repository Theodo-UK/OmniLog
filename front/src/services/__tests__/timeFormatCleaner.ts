import { TimeOption } from "@/types/logDisplayOptions";
import { timeFormatCleaner } from "../helpers/timeFormatCleaner";

describe("timeFormatCleaner", () => {
    it('should convert "Last day" to the corresponding TimeOption', () => {
        const result = timeFormatCleaner("Last day");
        const expected: TimeOption = "last-day";
        expect(result).toEqual(expected);
    });
    it('should convert "Last week" to the corresponding TimeOption', () => {
        const result = timeFormatCleaner("Last week");
        const expected: TimeOption = "last-week";
        expect(result).toEqual(expected);
    });
    it('should convert "Last hour" to the corresponding TimeOption', () => {
        const result = timeFormatCleaner("Last hour");
        const expected: TimeOption = "last-hour";
        expect(result).toEqual(expected);
    });
    it("should convert invalid option to undefined", () => {
        const result = timeFormatCleaner("invalid option");
        const expected = undefined;
        expect(result).toEqual(expected);
    });
});
