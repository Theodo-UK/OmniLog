import { llm_logs } from "@prisma/client";
import { prisma } from "./PrismaClient";
import { extractDataFromSearchParam } from "./helpers/formatSearchParamToPrismaQuery";

export const LogsData = {
    getLogs: async (searchParams?: URLSearchParams): Promise<llm_logs[]> => {
        const { timeframe, sort } = extractDataFromSearchParam(searchParams);
        return await prisma.llm_logs.findMany({
            where: {
                datetime_utc: timeframe,
            },
            orderBy: sort,
        });
    },
    getLogDetails: async (id: string): Promise<llm_logs> => {
        const log = await prisma.llm_logs.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (log === null) {
            throw new Error("Log not found");
        }

        return log;
    },
};
