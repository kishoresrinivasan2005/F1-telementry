import DashboardLayout from '../components/DashboardLayout';
import TelemetryProvider from '../components/telemetry/TelemetryProvider';

export default function Home() {
  return (
    <TelemetryProvider>
      <main className="min-h-screen">
        <DashboardLayout />
      </main>
    </TelemetryProvider>
  );
}
