import { TimeOption } from "@/types/logDisplayOptions";
import "@testing-library/jest-dom";
import { stringToTimeframeObject } from "../helpers/formatSearchParamToPrismaQuery";
import { MS_PER_DAY, MS_PER_HOUR, MS_PER_WEEK } from "../helpers/timeConstants";

describe("stringToTimeframeObject", () => {
    it.each([
        ["last-hour", MS_PER_HOUR],
        ["last-day", MS_PER_DAY],
        ["last-week", MS_PER_WEEK],
        ["invalid time option", MS_PER_HOUR],
    ])("should convert %s to %s", (timeOption, expected) => {
        const timestamp = stringToTimeframeObject(timeOption as TimeOption);
        const difference = timestamp.lte.getTime() - timestamp.gte.getTime();
        expect(difference).toEqual(expected);
    });
});
