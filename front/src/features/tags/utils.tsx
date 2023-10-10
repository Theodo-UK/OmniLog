import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export const prismaErrorHandler = (
    error: Prisma.PrismaClientKnownRequestError,
) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case "P2016": {
                return NextResponse.json(
                    { error: "No log exists with the given ID" },
                    { status: 404 },
                );
            }
            case "P2025": {
                return NextResponse.json(
                    { error: "No tag exists with the provided ID" },
                    { status: 400 },
                );
            }
            case "P5007": {
                return NextResponse.json(
                    { error: "You are not authenticated" },
                    { status: 401 },
                );
            }
        }
    }
};
