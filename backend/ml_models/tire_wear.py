import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression

class TireWearPredictor:
    def __init__(self):
        self.model = LinearRegression()
        self.is_trained = False
        self._initialize_baseline_model()

    def _initialize_baseline_model(self):
        """
        Trains a baseline model using synthetic data so it's ready immediately.
        In a real scenario, this would load pre-trained weights or train on a historical DB.
        """
        # Synthetic data: Features are [laps_completed, avg_speed_modifier]
        # Target: wear percentage (0 to 100)
        # Roughly, wear = 2.5 * laps_completed * speed_modifier
        
        np.random.seed(42)
        X = []
        y = []
        for lap in range(1, 40):
            for speed_mod in [0.8, 1.0, 1.2]:
                wear = 2.5 * lap * speed_mod + np.random.normal(0, 1.0)
                wear = min(max(wear, 0), 100)
                X.append([lap, speed_mod])
                y.append(wear)
                
        self.model.fit(X, y)
        self.is_trained = True

    def predict_wear(self, current_lap: int, current_wear: float, expected_speed_mod: float = 1.0, lookahead_laps: int = 5) -> list[float]:
        """
        Predicts the tire wear for the next `lookahead_laps`.
        """
        if not self.is_trained:
            return []

        predictions = []
        # We adjust the baseline prediction based on the difference from the current actual wear
        baseline_pred_now = self.model.predict([[current_lap, expected_speed_mod]])[0]
        offset = current_wear - baseline_pred_now

        for i in range(1, lookahead_laps + 1):
            future_lap = current_lap + i
            pred = self.model.predict([[future_lap, expected_speed_mod]])[0]
            # Apply the offset to correct the trajectory based on actual live data
            adjusted_pred = pred + offset
            predictions.append(min(max(adjusted_pred, 0), 100))
            
        return predictions

    def predict_laps_until_critical(self, current_lap: int, current_wear: float, critical_threshold: float = 80.0, expected_speed_mod: float = 1.0) -> int:
        """
        Predicts how many laps remain until tire wear reaches the critical threshold.
        """
        if not self.is_trained or current_wear >= critical_threshold:
            return 0
            
        # Estimate the slope (wear per lap) using the model
        pred_now = self.model.predict([[current_lap, expected_speed_mod]])[0]
        pred_next = self.model.predict([[current_lap + 1, expected_speed_mod]])[0]
        wear_per_lap = max(0.1, pred_next - pred_now) # Ensure we don't divide by zero or negative
        
        remaining_wear = critical_threshold - current_wear
        laps_remaining = remaining_wear / wear_per_lap
        
        return max(0, int(laps_remaining))
