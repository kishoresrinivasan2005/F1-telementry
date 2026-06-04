import time
from ml_models.tire_wear import TireWearPredictor

class StrategyEngine:
    def __init__(self):
        self.tire_predictor = TireWearPredictor()
        self.last_telemetry = None
        
    def process_telemetry(self, data: dict):
        """Called frequently (e.g., 10Hz) to keep the engine state updated."""
        self.last_telemetry = data
        
    def get_strategy_update(self) -> dict:
        """Called less frequently (e.g., 1Hz) to get the latest strategy recommendation."""
        if not self.last_telemetry:
            return None
            
        data = self.last_telemetry
        current_lap = data.get("lap", 1)
        
        wear_fl = data.get("tire_wear_fl", 0)
        wear_fr = data.get("tire_wear_fr", 0)
        wear_rl = data.get("tire_wear_rl", 0)
        wear_rr = data.get("tire_wear_rr", 0)
        current_wear = (wear_fl + wear_fr + wear_rl + wear_rr) / 4.0
        
        laps_until_pit = self.tire_predictor.predict_laps_until_critical(current_lap, current_wear, critical_threshold=80.0)
        future_wear = self.tire_predictor.predict_wear(current_lap, current_wear, lookahead_laps=5)
        
        optimal_pit_lap = current_lap + laps_until_pit
        
        recommendation = "Maintain current pace"
        if laps_until_pit <= 1:
            recommendation = "BOX BOX BOX"
        elif laps_until_pit <= 3:
            recommendation = "Pit window opening soon"
        elif data.get("fuel_load", 110.0) < 10.0:
            recommendation = "Fuel critical, conserve fuel"

        return {
            "timestamp": int(time.time() * 1000),
            "current_lap": current_lap,
            "optimal_pit_lap": optimal_pit_lap,
            "laps_until_pit": laps_until_pit,
            "future_wear_predictions": [round(w, 2) for w in future_wear],
            "recommendation": recommendation
        }
