import { useTelemetryStore } from '../store/telemetryStore';
import { TelemetryData } from '../types/telemetry';

let ws: WebSocket | null = null;

export const connectWebSocket = () => {
  if (ws) return;

  // Assuming backend runs on port 8000 locally
  ws = new WebSocket('ws://localhost:8000/ws/telemetry');

  ws.onopen = () => {
    console.log('WebSocket connected');
    useTelemetryStore.getState().setConnected(true);
  };

  ws.onmessage = (event) => {
    try {
      const data: TelemetryData = JSON.parse(event.data);
      useTelemetryStore.getState().updateData(data);
    } catch (e) {
      console.error("Error parsing telemetry data:", e);
    }
  };

  ws.onclose = () => {
    console.log('WebSocket disconnected');
    useTelemetryStore.getState().setConnected(false);
    ws = null;
    // Attempt reconnect
    setTimeout(connectWebSocket, 3000);
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
    ws?.close();
  };
};

export const disconnectWebSocket = () => {
  if (ws) {
    ws.close();
    ws = null;
  }
};
