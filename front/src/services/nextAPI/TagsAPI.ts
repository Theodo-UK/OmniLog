import { safeCastToTagArray } from "@/types/safeCast";
import { Tag } from "@prisma/client";

export const TagsAPI = {
    getTags: async (): Promise<Tag[]> => {
        const response = await fetch("/api/tags", { method: "GET" }).then(
            (res) => res.json(),
        );
        return safeCastToTagArray(response.tags);
    },
    connectTagToLog: (logId: string, tagId: string): void => {
        fetch(`/api/logs/${logId}/connectTag`, {
            method: "POST",
            body: JSON.stringify({ tagId }),
        }).then((res) => res.json());
    },
};
