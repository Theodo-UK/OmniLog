import { prisma } from "../PrismaClient";

export const TagsData = {
    getTags: async () => {
        return prisma.tag.findMany();
    },
};
