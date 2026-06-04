'use client';
import { useEffect } from 'react';
import { useStrategyStore } from '../store/strategyStore';
import { connectStrategyWebSocket, disconnectStrategyWebSocket } from '../services/strategyWebsocket';
import { BrainCircuit, Flag, AlertTriangle } from 'lucide-react';

export default function StrategyPanel() {
  const data = useStrategyStore((state) => state.data);
  const isConnected = useStrategyStore((state) => state.isConnected);

  useEffect(() => {
    connectStrategyWebSocket();
    return () => {
      disconnectStrategyWebSocket();
    };
  }, []);

  return (
    <div className="glass-panel p-6 flex flex-col justify-center border-t-4 border-[#e10600]">
      <div className="flex items-center gap-3 mb-4">
        <BrainCircuit className="text-[#e10600]" size={28} />
        <h3 className="text-xl font-bold text-white uppercase tracking-wider">AI Strategy Engine</h3>
      </div>
      
      {data ? (
        <div className="space-y-6">
          <div className="bg-black/40 p-4 rounded-lg border border-white/10">
            <p className="text-sm text-gray-400 mb-1">AI Recommendation</p>
            <p className={`text-2xl font-bold ${data.laps_until_pit <= 3 ? 'text-[#ffea00] animate-pulse' : 'text-white'}`}>
              {data.recommendation}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/20 p-3 rounded-lg">
              <p className="text-xs text-gray-400 flex items-center gap-1"><Flag size={14} /> Optimal Pit</p>
              <p className="text-xl font-bold text-white">Lap {data.optimal_pit_lap}</p>
            </div>
            <div className="bg-black/20 p-3 rounded-lg">
              <p className="text-xs text-gray-400 flex items-center gap-1"><AlertTriangle size={14} /> Laps Until Pit</p>
              <p className="text-xl font-bold text-[#e10600]">{data.laps_until_pit}</p>
            </div>
          </div>

          <div>
             <p className="text-sm text-gray-400 mb-2">Predicted Tire Wear (Next 5 Laps)</p>
             <div className="flex justify-between items-end h-16 gap-1 border-b border-white/10 pb-1">
                {data.future_wear_predictions.map((wear, idx) => (
                   <div key={idx} className="flex-1 flex flex-col justify-end items-center group relative h-full">
                      <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-black px-1 rounded text-white z-10 whitespace-nowrap">
                         {wear.toFixed(1)}%
                      </div>
                      <div 
                        className={`w-full rounded-t-sm transition-all duration-500 max-h-full ${wear > 80 ? 'bg-red-500' : wear > 60 ? 'bg-yellow-500' : 'bg-[#00ff00]'}`} 
                        style={{ height: `${wear}%` }}
                      />
                   </div>
                ))}
             </div>
             <div className="flex justify-between items-end gap-1 mt-1">
                {data.future_wear_predictions.map((_, idx) => (
                    <span key={idx} className="flex-1 text-center text-[9px] text-gray-500">L{data.current_lap + idx + 1}</span>
                ))}
             </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500 flex-col gap-2 py-8">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-[#00ff00] animate-pulse' : 'bg-red-500'}`} />
            <span className="text-sm">{isConnected ? 'Analyzing data...' : 'Waiting for connection...'}</span>
        </div>
      )}
    </div>
  );
}
