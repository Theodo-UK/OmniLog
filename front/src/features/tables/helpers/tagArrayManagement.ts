import { Tag } from "@prisma/client";

export const isTagInArray = (tags: Tag[], tagId: string): boolean => {
    return tags.some((tag) => tag.id === tagId);
};

export const findTagById = (tags: Tag[], tagId: string): Tag => {
    const tag = tags.find((tag) => tag.id === tagId);
    if (tag === undefined) {
        throw new Error(
            `Failed to find tag of id ${tagId} among the given tags.`,
        );
    }
    return tag;
};

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
