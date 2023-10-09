import { LogsData } from "@/services/LogsData";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { id: string } },
) {
    const json = await req.json();
    const tagId = json.tagId;
    try {
        await LogsData.connectTag(params.id, tagId);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
    return NextResponse.json({}, { status: 201 });
}
