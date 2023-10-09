import { TagsData } from "@/services/prisma/TagsData";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse> => {
    try {
        const tags = await TagsData.getTags();
        return NextResponse.json({ tags }, { status: 200 });
    } catch (err: unknown) {
        let message = `failed to fetch tags from prisma: ${err}`;
        if (err instanceof Prisma.PrismaClientKnownRequestError)
            message = `failed to fetch tags from prisma: ${err.message}`;
        return NextResponse.json({ error: message }, { status: 500 });
    }
};
