import { TimeOption } from "@/types/logDisplayOptions";
import { displayNameFromTimeOption } from "../helpers/displayNameToTimeOption";

describe("displayNameToTimeOption", () => {
    it.each([
        ["last-day", "Last day"],
        ["last-week", "Last week"],
        ["last-hour", "Last hour"],
        ["invalid time option", undefined],
    ])("should convert %s to %s", (timeOption, expected) => {
        const result = displayNameFromTimeOption(timeOption as TimeOption);
        expect(result).toEqual(expected);
    });
});
