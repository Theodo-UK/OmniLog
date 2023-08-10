from prisma import Client


async def send_data(input_log) -> dict:
    db = Client()
    await db.connect()

    try:
        await db.log.create(input_log)
        await db.disconnect()
        return {'success': True }

    except Exception as e:
        await db.disconnect()
        return { 'success': False, 'error': e }
