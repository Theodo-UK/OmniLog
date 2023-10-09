import { prismaErrorHandler } from "@/features/tags/utils";
import { LogsData } from "@/services/LogsData";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

type QueryParams = {
    params: { id: string };
};

export async function POST(req: Request, { params }: QueryParams) {
    let json;
    let tagId;

    try {
        json = await req.json();
        ({ tagId } = json);
    } catch (error) {
        return NextResponse.json(
            { error: "No tagId found in the body of the post request" },
            { status: 400 },
        );
    }

    try {
        await LogsData.connectTagToLog(params.id, tagId);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return prismaErrorHandler(error);
        }
        return NextResponse.json({ error: error }, { status: 500 });
    }
    return NextResponse.json({}, { status: 201 });
}
