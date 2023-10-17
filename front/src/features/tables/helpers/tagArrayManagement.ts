import { TagData } from "@/types/logDisplayOptions";

export const isTagInArray = (tags: TagData[], tagId: string): boolean => {
    return tags.some((tag) => tag.id === tagId);
};

export const findTagById = (tags: TagData[], tagId: string): TagData => {
    const tag = tags.find((tag) => tag.id === tagId);
    if (tag === undefined) {
        throw new Error(
            `Failed to find tag of id ${tagId} among the given tags.`,
        );
    }
    return tag;
};

export const concatAndSortTags = (tags: TagData[], newTag: TagData): TagData[] => {
    const newTagArray = [...tags, newTag];
    return newTagArray.sort((tagA, tagB) => {
        return tagA.name.localeCompare(tagB.name);
    });
};
