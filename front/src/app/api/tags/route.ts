import { TagsData } from "@/services/prisma/TagsData";

export const GET = async () => {
    try {
        const tags = await TagsData.getTags();
        return Response.json({ tags });
    } catch (err) {
        return Response.json({ error: "failed to fetch tags from prisma" });
    }
};
