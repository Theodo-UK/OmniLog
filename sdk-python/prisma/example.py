import asyncio
from send_data import send_data

print("Trying prisma connection:")
log = {
        'input': 'What is prisma?',
        'output': 'Prisma is a database toolkit that makes databases easy.',
        'token_count': 6,
    }
result = asyncio.get_event_loop().run_until_complete(send_data(log))

if result["success"]:
    print("Success!")
else:
    print(result["error"])
