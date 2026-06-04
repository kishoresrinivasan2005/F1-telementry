import { create } from 'zustand';

export interface StrategyData {
  timestamp: number;
  current_lap: number;
  optimal_pit_lap: number;
  laps_until_pit: number;
  future_wear_predictions: number[];
  recommendation: string;
}

interface StrategyState {
  data: StrategyData | null;
  isConnected: boolean;
  updateData: (data: StrategyData) => void;
  setConnected: (status: boolean) => void;
}

export const useStrategyStore = create<StrategyState>((set) => ({
  data: null,
  isConnected: false,
  updateData: (newData) => set({ data: newData }),
  setConnected: (status) => set({ isConnected: status }),
}));
