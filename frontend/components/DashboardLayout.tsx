'use client';
import { useTelemetryStore } from '../store/telemetryStore';
import SpeedChart from './charts/SpeedChart';
import StrategyPanel from './StrategyPanel';
import { Activity, Zap, Timer, Gauge } from 'lucide-react';

export default function DashboardLayout() {
  const data = useTelemetryStore((state) => state.data);
  const isConnected = useTelemetryStore((state) => state.isConnected);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wider uppercase">Race Control <span className="text-[#e10600]">Telemetry</span></h1>
          <p className="text-gray-400">Live AI Strategy Platform</p>
        </div>
        <div className="flex items-center gap-3 glass-panel px-4 py-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-[#00ff00] animate-pulse' : 'bg-red-500'}`} />
          <span className="text-sm font-semibold">{isConnected ? 'LIVE FEED ACTIVE' : 'CONNECTING...'}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard icon={<Gauge />} title="Speed" value={data ? `${data.speed} km/h` : '---'} color="#00d2ff" />
        <StatCard icon={<Activity />} title="RPM" value={data ? data.rpm.toString() : '---'} color="#e10600" />
        <StatCard icon={<Timer />} title="Lap / Sector" value={data ? `L${data.lap} / S${data.sector}` : '---'} color="#00ff00" />
        <StatCard icon={<Zap />} title="ERS Battery" value={data ? `${data.ers_battery.toFixed(1)}%` : '---'} color="#ffea00" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SpeedChart />
        </div>
        <div className="flex flex-col gap-6">
          <div className="glass-panel p-6 flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-4 text-white">Car Telemetry</h3>
              {data ? (
                  <div className="space-y-4">
                      <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-gray-400">Gear</span>
                          <span className="font-bold text-2xl">{data.gear}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-gray-400">Throttle</span>
                          <span className="font-bold">{data.throttle}%</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-gray-400">Brake</span>
                          <span className="font-bold">{data.brake}%</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-gray-400">DRS</span>
                          <span className={`font-bold ${data.drs ? 'text-[#00ff00]' : 'text-gray-600'}`}>{data.drs ? 'OPEN' : 'CLOSED'}</span>
                      </div>
                      <div className="flex justify-between">
                          <span className="text-gray-400">Fuel Load</span>
                          <span className="font-bold text-[#ffea00]">{data.fuel_load} kg</span>
                      </div>
                  </div>
              ) : (
                  <div className="text-center text-gray-500">Waiting for telemetry...</div>
              )}
          </div>
          <StrategyPanel />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color }: { icon: any, title: string, value: string, color: string }) {
  return (
    <div className="glass-panel p-6 flex items-center gap-4 hover:border-white/20 transition-colors">
      <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}20`, color: color }}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
