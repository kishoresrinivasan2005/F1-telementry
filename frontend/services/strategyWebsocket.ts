import { useStrategyStore, StrategyData } from '../store/strategyStore';

let ws: WebSocket | null = null;

export const connectStrategyWebSocket = () => {
  if (ws) return;

  ws = new WebSocket('ws://localhost:8000/ws/strategy');

  ws.onopen = () => {
    console.log('Strategy WebSocket connected');
    useStrategyStore.getState().setConnected(true);
  };

  ws.onmessage = (event) => {
    try {
      const data: StrategyData = JSON.parse(event.data);
      useStrategyStore.getState().updateData(data);
    } catch (e) {
      console.error("Error parsing strategy data:", e);
    }
  };

  ws.onclose = () => {
    console.log('Strategy WebSocket disconnected');
    useStrategyStore.getState().setConnected(false);
    ws = null;
    setTimeout(connectStrategyWebSocket, 3000);
  };

  ws.onerror = (error) => {
    console.error('Strategy WebSocket error:', error);
    ws?.close();
  };
};

export const disconnectStrategyWebSocket = () => {
  if (ws) {
    ws.close();
    ws = null;
  }
};
