export interface TelemetryData {
  timestamp: number;
  lap: number;
  sector: number;
  speed: number;
  rpm: number;
  gear: number;
  throttle: number;
  brake: number;
  drs: boolean;
  ers_battery: number;
  tire_temp_fl: number;
  tire_temp_fr: number;
  tire_temp_rl: number;
  tire_temp_rr: number;
  tire_wear_fl: number;
  tire_wear_fr: number;
  tire_wear_rl: number;
  tire_wear_rr: number;
  fuel_load: number;
  track_pos_x: number;
  track_pos_y: number;
}
