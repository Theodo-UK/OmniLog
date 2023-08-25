import { llm_logs } from "@prisma/client";
import { prisma } from "./PrismaClient";
import { stringToTimeframeObject } from "./helpers/stringToTimeframeObject";

export const LogsData = {
    getLogs: async (stringTimeframe: string): Promise<llm_logs[]> => {
        const timeframe = stringToTimeframeObject(stringTimeframe);
        return await prisma.llm_logs.findMany({
            where: {
                datetime_utc: timeframe,
            },
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
