import { llm_logs } from "@prisma/client";
import { prisma } from "./PrismaClient";

export const LogsData = {
    getLogs: async (): Promise<llm_logs[]> => {
        return await prisma.llm_logs.findMany();
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
