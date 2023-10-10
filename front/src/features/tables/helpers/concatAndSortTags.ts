import { Tag } from "@prisma/client";

export const concatAndSortTags = (tags: Tag[], newTag: Tag): Tag[] => {
    const newTagArray = [...tags, newTag];
    return newTagArray.sort((tagA, tagB) => {
        return compareStrings(tagA.name, tagB.name);
    });
};

const compareStrings = (stringA: string, stringB: string): number => {
    const stringALowerCase = stringA.toLowerCase();
    const stringBLowerCase = stringB.toLowerCase();
    if (stringALowerCase < stringBLowerCase) return -1;
    if (stringBLowerCase < stringALowerCase) return 1;
    return 0;
};
