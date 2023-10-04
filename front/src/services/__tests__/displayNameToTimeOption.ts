import { TimeOption } from "@/types/logDisplayOptions";
import { displayNameToTimeOption } from "../helpers/displayNameToTimeOption";

describe("displayNameToTimeOption", () => {
    it.each([
        ["Last day", "last-day" as TimeOption],
        ["Last week", "last-week" as TimeOption],
        ["Last hour", "last-hour" as TimeOption],
        ["invalid option", undefined],
    ])("should convert %s to %s", (displayName, expected) => {
        const result = displayNameToTimeOption(displayName);
        expect(result).toEqual(expected);
    });
});
