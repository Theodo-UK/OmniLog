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
        return tagA.name.localeCompare(tagB.name);
    });
};
