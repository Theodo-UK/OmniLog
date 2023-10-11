export const LogsAPI = {
    connectTagToLog: (logId: string, tagId: string): Promise<boolean> => {
        const success = fetch(`/api/logs/${logId}/connectTag`, {
            method: "POST",
            body: JSON.stringify({ tagId }),
        }).then((res) => res.status === 201);
        return success;
    },
};
