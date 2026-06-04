'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTelemetryStore } from '../../store/telemetryStore';

export default function SpeedChart() {
  const history = useTelemetryStore((state) => state.history);

  // Format data for recharts
  const data = history.map((point) => ({
    time: point.timestamp,
    speed: point.speed,
    rpm: point.rpm / 100 // Scale down RPM to fit on the same graph or use multiple axes
  }));

  return (
    <div className="w-full h-[300px] glass-panel p-4">
      <h3 className="text-xl font-bold mb-4 text-[#00d2ff]">Telemetry Over Time</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="time" hide />
          <YAxis yAxisId="left" stroke="#00d2ff" domain={[0, 350]} />
          <YAxis yAxisId="right" orientation="right" stroke="#e10600" domain={[0, 150]} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(21, 21, 30, 0.9)', border: 'none', borderRadius: '8px' }}
            itemStyle={{ color: '#fff' }}
          />
          <Line yAxisId="left" type="monotone" dataKey="speed" stroke="#00d2ff" strokeWidth={2} dot={false} isAnimationActive={false} />
          <Line yAxisId="right" type="monotone" dataKey="rpm" stroke="#e10600" strokeWidth={2} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
