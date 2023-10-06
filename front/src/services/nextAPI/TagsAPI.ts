import { Tag } from "@prisma/client";

export const TagsAPI = {
    getTags: async (): Promise<Tag[]> => {
        return fetch("/api/tags", { method: "GET" }).then((res) => res.json());
    },
    connectTagToLog: async (logId: string, tagId: string): Promise<void> => {
        return fetch(`/api/logs/${logId}/connectTag`, {
            method: "POST",
            body: JSON.stringify({ tagId }),
        }).then((res) => res.json());
    },
};
