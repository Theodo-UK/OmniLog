import { getErrorMessage } from "@/app/helpers/getErrorMessage";
import { TagsData } from "@/services/prisma/TagsData";
import { NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse> => {
    try {
        const tags = await TagsData.getTags();
        return NextResponse.json({ tags }, { status: 200 });
    } catch (err: unknown) {
        const message = getErrorMessage(err);
        return NextResponse.json(
            {
                error: `failed to fetch tags from prisma: ${message}`,
            },
            { status: 500 },
        );
    }
};
