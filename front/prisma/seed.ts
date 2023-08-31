import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const password = await hash("test", 12);
    const user = await prisma.omnilog_user.upsert({
        where: { email: "test@test.com" },
        update: {},
        create: {
            email: "test@test.com",
            name: "Test User",
            password,
        },
    });
    console.log({ user });
    const log = await prisma.llm_logs.create({
        data: {
            datetime_utc: new Date().toISOString(),
            input_string: "Some string",
            output_string: "Some result",
            total_tokens: 1,
        },
    });
    console.log({ log });
}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
