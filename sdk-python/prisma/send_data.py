from prisma import Client


async def send_data(input_log) -> None:
    db = Client()
    await db.connect()

    saved_log = await db.log.create(input_log)

    await db.disconnect()
    return saved_log
