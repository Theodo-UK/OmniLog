import { safeCastToTagArray } from "@/types/safeCast";
import { Tag } from "@prisma/client";

export const TagsAPI = {
    getTags: async (): Promise<Tag[]> => {
        const response = await fetch("/api/tags", { method: "GET" }).then(
            (res) => res.json(),
        );
        return safeCastToTagArray(response.tags);
    },
};
