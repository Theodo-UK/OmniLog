import { LogsData } from "@/services/LogsData";
import { NextResponse } from "next/server";

type QueryParams = {
    params: { id: string };
};

export async function POST(req: Request, { params }: QueryParams) {
    try {
        const json = await req.json();
        const { tagId } = json;
        await LogsData.connectTagToLog(params.id, tagId);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
    return NextResponse.json({}, { status: 201 });
}
