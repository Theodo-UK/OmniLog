import { LogData, LogDataArray } from "@/types/logDisplayOptions";
import { prisma } from "../PrismaClient";
import { convertSearchParamToPrismaConditions } from "../helpers/formatSearchParamToPrismaQuery";
import {
    injectDefaultProjectInLogData,
    injectDefaultProjectInLogDataArray,
} from "../helpers/injectDefaultProjectInLogData";

export const LogsData = {
    getLogs: async (searchParams?: URLSearchParams): Promise<LogDataArray> => {
        const { timeframe, sort, searchCondition } =
            convertSearchParamToPrismaConditions(searchParams);
        const logs = await prisma.llmLogs.findMany({
            where: {
                datetime_utc: timeframe,
                OR: searchCondition,
            },
            orderBy: sort,
            include: {
                tags: {
                    orderBy: {
                        name: "asc",
                    },
                    take: 5,
                },
                project: true,
            },
        });
        return injectDefaultProjectInLogDataArray(logs);
    },
    getLogDetails: async (id: string): Promise<LogData> => {
        const log = await prisma.llmLogs.findUnique({
            where: {
                id,
            },
            include: {
                tags: {
                    orderBy: {
                        name: "asc",
                    },
                },
                project: true,
            },
        });

        if (log === null) {
            throw new Error("Log not found");
        }

        return injectDefaultProjectInLogData(log);
    },
    connectTagToLog: async (logId: string, tagId: string) => {
        const result = await prisma.llmLogs.update({
            where: {
                id: logId,
            },
            data: {
                tags: {
                    connect: {
                        id: tagId,
                    },
                },
            },
            include: {
                tags: true,
            },
        });
        return result;
    },
};
