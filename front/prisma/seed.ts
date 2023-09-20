import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const name = process.argv[2];
const email = process.argv[3];
const password = process.argv[4];

if (!name || !email || !password) {
    console.error(
        `Missing argument:\nname: '${name}'\nemail: '${email}'\npassword: '${password}`,
    );
    process.exit(1);
}

const prisma = new PrismaClient();

async function main() {
    const hashed = await hash(password!, 12);
    const user = await prisma.omnilogUser.upsert({
        where: { email: email },
        update: {},
        create: {
            email: email!,
            name: name!,
            password: hashed,
        },
    });
    console.log({ user });
    const log = await prisma.llmLogs.create({
        data: {
            datetime_utc: new Date().toISOString(),
            input_string: "Some string",
            output_string: "Some result",
            total_tokens: 1,
            cost: 0.11,
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
