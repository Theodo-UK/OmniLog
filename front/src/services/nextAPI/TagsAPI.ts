import { TagData } from "@/types/logDisplayOptions";
import { safeCastToTagArray } from "@/types/safeCast";

export const TagsAPI = {
    getTags: async (): Promise<TagData[]> => {
        const response = await fetch("/api/tags", { method: "GET" }).then(
            (res) => res.json(),
        );
        return safeCastToTagArray(response.tags);
    },
};
