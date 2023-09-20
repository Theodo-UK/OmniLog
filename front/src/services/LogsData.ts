import { llmLogs } from "@prisma/client";
import { prisma } from "./PrismaClient";
import { convertSearchParamToPrismaConditions } from "./helpers/formatSearchParamToPrismaQuery";

export const LogsData = {
    getLogs: async (searchParams?: URLSearchParams): Promise<llmLogs[]> => {
        const { timeframe, sort, searchCondition } =
            convertSearchParamToPrismaConditions(searchParams);
        return await prisma.llmLogs.findMany({
            where: {
                datetime_utc: timeframe,
                OR: searchCondition,
            },
            orderBy: sort,
        });
    },
    getLogDetails: async (id: string): Promise<llmLogs> => {
        const log = await prisma.llmLogs.findUnique({
            where: {
                id,
            },
        });

        if (log === null) {
            throw new Error("Log not found");
        }

        return log;
    },
};
