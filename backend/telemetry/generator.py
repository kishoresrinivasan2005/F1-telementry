import asyncio
import time
import math
import random
from typing import Dict, Any

class SyntheticTelemetryGenerator:
    def __init__(self):
        self.lap = 1
        self.sector = 1
        self.time_in_lap = 0.0
        self.fuel_load = 110.0 # Starting fuel
        self.tire_wear = 0.0
        self.running = False
        
        # Track parameters (simplified synthetic track)
        self.lap_time_estimate = 90.0 # seconds
        self.dt = 0.1 # 10Hz
        
    def generate_point(self) -> Dict[Any, Any]:
        """Generates a realistic synthetic telemetry data point."""
        
        # Determine track position via a sine wave mapping to simulate corners and straights
        progress = (self.time_in_lap / self.lap_time_estimate) * 2 * math.pi
        
        # Speed varies between 80 and 330 based on 'progress' on the track
        # A simple sine wave to represent corners (low speed) and straights (high speed)
        speed_modifier = math.sin(progress * 4) # 4 corners per lap
        speed = max(80, 205 + 125 * speed_modifier + random.uniform(-2, 2))
        
        # RPM correlates with speed but varies by gear
        gear = max(1, min(8, int(speed / 40) + 1))
        rpm = 4000 + ((speed % 40) / 40.0) * 8500 + random.uniform(-100, 100)
        
        throttle = 100.0 if speed_modifier > 0.5 else max(0.0, speed_modifier * 100 + 50)
        brake = 100.0 if speed_modifier < -0.5 else 0.0
        drs = True if speed > 280 and throttle > 90 else False
        
        # Tire temps increase with speed/cornering, cool on straights
        base_temp = 90.0
        temp_spike = abs(speed_modifier) * 20
        tire_temps = [base_temp + temp_spike + random.uniform(-1, 1) for _ in range(4)]
        
        # Tire wear increases linearly over time
        self.tire_wear += 0.01 * self.dt # 0.01% per 0.1s
        
        # Fuel decreases linearly
        self.fuel_load -= 0.03 * self.dt
        
        # Update sector
        if self.time_in_lap < self.lap_time_estimate * 0.33:
            self.sector = 1
        elif self.time_in_lap < self.lap_time_estimate * 0.66:
            self.sector = 2
        else:
            self.sector = 3
            
        data = {
            "timestamp": int(time.time() * 1000),
            "lap": self.lap,
            "sector": self.sector,
            "speed": round(speed, 1),
            "rpm": round(rpm, 0),
            "gear": gear,
            "throttle": round(throttle, 1),
            "brake": round(brake, 1),
            "drs": drs,
            "ers_battery": max(0.0, 100.0 - (self.lap * 1.5)),
            "tire_temp_fl": round(tire_temps[0], 1),
            "tire_temp_fr": round(tire_temps[1], 1),
            "tire_temp_rl": round(tire_temps[2], 1),
            "tire_temp_rr": round(tire_temps[3], 1),
            "tire_wear_fl": round(self.tire_wear, 2),
            "tire_wear_fr": round(self.tire_wear, 2),
            "tire_wear_rl": round(self.tire_wear, 2),
            "tire_wear_rr": round(self.tire_wear, 2),
            "fuel_load": round(self.fuel_load, 2),
            "track_pos_x": round(math.cos(progress) * 1000, 1),
            "track_pos_y": round(math.sin(progress * 2) * 500, 1)
        }
        
        self.time_in_lap += self.dt
        if self.time_in_lap >= self.lap_time_estimate:
            self.lap += 1
            self.time_in_lap = 0.0
            
        return data

    async def stream_data(self, callback):
        """Streams data endlessly to the provided callback function."""
        self.running = True
        while self.running:
            data = self.generate_point()
            await callback(data)
            await asyncio.sleep(self.dt)
            
    def stop(self):
        self.running = False
