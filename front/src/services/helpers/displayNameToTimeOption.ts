import { TimeOption } from "@/types/logDisplayOptions";
import { timeOptionConstants } from "./timeConstants";

export const displayNameToTimeOption = (
    displayName: string,
): TimeOption | undefined => {
    const timeOptionConstant = timeOptionConstants.filter(
        (option) => displayName === option.displayName,
    )[0];

    return timeOptionConstant ? timeOptionConstant.timeOption : undefined;
};
