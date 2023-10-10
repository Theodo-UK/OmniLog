export const LogsAPI = {
    connectTagToLog: (logId: string, tagId: string): Promise<boolean> => {
        const result = fetch(`/api/logs/${logId}/connectTag`, {
            method: "POST",
            body: JSON.stringify({ tagId }),
        }).then((res) => res.json().then((json) => json.success));
        return result;
    },
};
