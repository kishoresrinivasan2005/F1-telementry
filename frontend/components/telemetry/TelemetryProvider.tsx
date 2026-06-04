'use client';
import { useEffect } from 'react';
import { connectWebSocket, disconnectWebSocket } from '../../services/websocket';

export default function TelemetryProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    connectWebSocket();
    return () => {
      disconnectWebSocket();
    };
  }, []);

  return <>{children}</>;
}
