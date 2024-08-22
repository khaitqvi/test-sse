from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from sse_starlette.sse import EventSourceResponse
import asyncio
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

COUNTER = 0

async def counter_generator():
    global COUNTER
    while True:
        COUNTER += 1
        yield COUNTER
        await asyncio.sleep(1)

@app.get("/")
async def root():
    return {"message": "Server is running"}

@app.get("/events")
async def events(request: Request):
    async def event_generator():
        async for count in counter_generator():
            if await request.is_disconnected():
                break
            yield {"data": str(count)}

    return EventSourceResponse(event_generator())

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)