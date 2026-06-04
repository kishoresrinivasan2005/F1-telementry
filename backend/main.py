from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import asyncio
from websocket.manager import manager
from websocket.strategy_manager import strategy_manager
from telemetry.generator import SyntheticTelemetryGenerator
from strategy_engine.engine import StrategyEngine

app = FastAPI(
    title="F1 Telemetry Platform API",
    description="Real-time F1 Telemetry and Race Strategy Platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

telemetry_generator = SyntheticTelemetryGenerator()
strategy_engine = StrategyEngine()
generator_task = None
strategy_task = None

@app.on_event("startup")
async def startup_event():
    global generator_task, strategy_task
    
    async def telemetry_callback(data):
        # Update strategy engine with latest telemetry
        strategy_engine.process_telemetry(data)
        # Broadcast raw telemetry to clients
        await manager.broadcast(data)

    async def feed_telemetry():
        await telemetry_generator.stream_data(telemetry_callback)
        
    async def run_strategy_engine():
        while True:
            # Broadcast strategy updates at 1Hz
            update = strategy_engine.get_strategy_update()
            if update:
                await strategy_manager.broadcast(update)
            await asyncio.sleep(1.0)
    
    generator_task = asyncio.create_task(feed_telemetry())
    strategy_task = asyncio.create_task(run_strategy_engine())

@app.on_event("shutdown")
async def shutdown_event():
    telemetry_generator.stop()
    if generator_task:
        generator_task.cancel()
    if strategy_task:
        strategy_task.cancel()

@app.get("/")
async def root():
    return {"message": "Welcome to the F1 Telemetry Platform API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.websocket("/ws/telemetry")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.websocket("/ws/strategy")
async def strategy_websocket_endpoint(websocket: WebSocket):
    await strategy_manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        strategy_manager.disconnect(websocket)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
