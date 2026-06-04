import { create } from 'zustand';
import { TelemetryData } from '../types/telemetry';

interface TelemetryState {
  data: TelemetryData | null;
  history: TelemetryData[];
  isConnected: boolean;
  updateData: (data: TelemetryData) => void;
  setConnected: (status: boolean) => void;
}

export const useTelemetryStore = create<TelemetryState>((set) => ({
  data: null,
  history: [],
  isConnected: false,
  updateData: (newData) => set((state) => {
    const newHistory = [...state.history, newData];
    if (newHistory.length > 50) {
      newHistory.shift(); // Keep last 50 points for graphs
    }
    return { data: newData, history: newHistory };
  }),
  setConnected: (status) => set({ isConnected: status }),
}));
