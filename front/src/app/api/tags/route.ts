import { TagsData } from "@/services/prisma/TagsData";
import { NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse> => {
    try {
        const tags = await TagsData.getTags();
        return NextResponse.json({ tags });
    } catch (err) {
        return NextResponse.json({ error: "failed to fetch tags from prisma" });
    }
};
