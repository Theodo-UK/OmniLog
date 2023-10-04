import { TimeOption } from "@/types/logDisplayOptions";
import { displayNameFromTimeOption } from "../helpers/displayNameToTimeOption";

describe("displayNameToTimeOption", () => {
    it.each([
        [
            "should convert last-day to the corresponding displayName",
            "last-day",
            "Last day",
        ],
        [
            "should convert last-week to the corresponding displayName",
            "last-week",
            "Last week",
        ],
        [
            "should convert last-hour to the corresponding displayName",
            "last-hour",
            "Last hour",
        ],
        [
            "should convert invalid time options to undefined",
            "invalid",
            undefined,
        ],
    ])("%s", (testName, timeOption, expected) => {
        const result = displayNameFromTimeOption(timeOption as TimeOption);
        expect(result).toEqual(expected);
    });
});
