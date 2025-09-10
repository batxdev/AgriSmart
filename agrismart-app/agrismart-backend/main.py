# File: main.py

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import warnings
import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

warnings.filterwarnings('ignore')

# --- Pydantic model for request validation ---
# This defines the structure of the JSON data your React app will send.
class IrrigationRequest(BaseModel):
    crop: str
    stage: str
    farm_size_acres: float

# --- Your Existing SmartIrrigationSystem Class ---
class SmartIrrigationSystem:
    """
    A streamlined Smart Irrigation System for web application backends.
    It loads or generates persistent datasets and calculates 7-day irrigation
    schedules based on crop requirements and weather forecasts.
    """

    def __init__(self, data_dir='data'):
        """
        Initializes the system by loading datasets from CSV files or
        generating them if they don't exist.
        """
        self.data_dir = data_dir
        self.weather_data = None
        self.crop_data = None
        self.location = "Haryana"
        self.load_or_generate_datasets()

    def load_or_generate_datasets(self):
        """
        Checks for existing data CSVs. If found, loads them.
        Otherwise, generates new datasets and saves them to CSV.
        """
        os.makedirs(self.data_dir, exist_ok=True)
        weather_path = os.path.join(self.data_dir, 'weather_forecast.csv')
        crop_path = os.path.join(self.data_dir, 'crop_requirements.csv')

        if os.path.exists(crop_path):
            self.crop_data = pd.read_csv(crop_path)
        else:
            self.generate_crop_dataset()
            self.crop_data.to_csv(crop_path, index=False)

        if os.path.exists(weather_path):
            self.weather_data = pd.read_csv(weather_path)
            self.weather_data['Date'] = pd.to_datetime(self.weather_data['Date'])
        else:
            self.generate_weather_dataset()
            self.weather_data.to_csv(weather_path, index=False)

    def generate_weather_dataset(self):
        """Generates a synthetic 7-day weather forecast."""
        start_date = datetime.now()
        dates = [start_date + timedelta(days=i) for i in range(7)]
        np.random.seed(42)
        rainfall_patterns = [0, 2, 8, 0, 5, 25, 1, 3, 0, 15, 7, 0, 12, 2]
        self.weather_data = pd.DataFrame({
            'Date': dates,
            'Location': [self.location] * 7,
            'Rainfall_mm': np.random.choice(rainfall_patterns, 7),
            'Temperature_C': np.random.normal(28, 4, 7).clip(20, 35).round(1)
        })

    def generate_crop_dataset(self):
        """Generates the crop water requirement dataset."""
        crops_data = {
            'Wheat': {'Sowing': 15, 'Vegetative': 22, 'Flowering': 28, 'Maturity': 18},
            'Rice': {'Sowing': 20, 'Vegetative': 30, 'Flowering': 35, 'Maturity': 15},
            'Corn': {'Sowing': 18, 'Vegetative': 25, 'Flowering': 32, 'Maturity': 20},
            'Cotton': {'Sowing': 16, 'Vegetative': 24, 'Flowering': 30, 'Maturity': 22},
            'Sugarcane': {'Sowing': 25, 'Vegetative': 32, 'Flowering': 28, 'Maturity': 24}
        }
        crop_rows = []
        for crop, stages in crops_data.items():
            for stage, requirement in stages.items():
                crop_rows.append({'Crop': crop, 'Stage': stage, 'Requirement_mm': requirement})
        self.crop_data = pd.DataFrame(crop_rows)

    def get_crop_requirement(self, crop, stage):
        """Get water requirement for a specific crop and growth stage."""
        try:
            requirement = self.crop_data[
                (self.crop_data['Crop'] == crop) &
                (self.crop_data['Stage'] == stage)
            ]['Requirement_mm'].iloc[0]
            return requirement
        except IndexError:
            return None

    def calculate_irrigation_schedule(self, crop, stage, farm_size_acres):
        """Calculates the 7-day irrigation schedule."""
        if not isinstance(farm_size_acres, (int, float)) or farm_size_acres <= 0:
            return {'error': 'Invalid farm size. It must be a positive number.'}
        daily_requirement_mm = self.get_crop_requirement(crop, stage)
        if daily_requirement_mm is None:
            return {'error': f"Crop '{crop}' or stage '{stage}' not found."}

        farm_area_m2 = farm_size_acres * 4046.86
        schedule = []
        total_water_liters = 0
        skip_days = 0

        for _, day in self.weather_data.iterrows():
            rainfall = day['Rainfall_mm']
            water_needed_mm = max(0, daily_requirement_mm - rainfall)
            irrigation_liters = (water_needed_mm * farm_area_m2) / 1000

            action = "SKIP"
            should_skip = rainfall >= 20 or water_needed_mm <= 0
            
            if not should_skip:
                action = f"Irrigate {irrigation_liters:,.0f} L"
                total_water_liters += irrigation_liters
            else:
                irrigation_liters = 0
                skip_days += 1

            schedule.append({
                'date_str': day['Date'].strftime('%Y-%m-%d'),
                'day_of_week': day['Date'].strftime('%A'),
                'rainfall_mm': int(rainfall),
                'temperature_c': float(day['Temperature_C']),
                'water_needed_liters': int(round(float(irrigation_liters))),
                'action': str(action),
                'should_irrigate': bool(not should_skip)
            })

        return {
            'crop': crop,
            'stage': stage,
            'farm_size_acres': float(farm_size_acres),
            'daily_requirement_mm': int(daily_requirement_mm),
            'schedule': schedule,
            'summary': {
                'total_water_liters': int(round(float(total_water_liters))),
                'irrigation_days': int(7 - skip_days),
                'water_saving_days': int(skip_days)
            }
        }

# --- FastAPI Application Setup ---
app = FastAPI()

# Add CORS middleware to allow requests from your React frontend.
# This is a critical step for local development.
origins = [
    "http://localhost",
    "http://localhost:3000", # Default Create React App port
    "http://localhost:5173", # Default Vite dev port
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Instantiate the system once, so datasets are loaded only on startup
irrigation_system = SmartIrrigationSystem()

@app.post("/irrigation-schedule")
def get_schedule(request: IrrigationRequest):
    """
    API endpoint to calculate the irrigation schedule.
    It receives crop, stage, and farm size from the frontend.
    """
    schedule_result = irrigation_system.calculate_irrigation_schedule(
        crop=request.crop,
        stage=request.stage,
        farm_size_acres=request.farm_size_acres
    )
    return schedule_result

# This block allows running the server directly using `python3 main.py`
if __name__ == "__main__":
    print("🚀 Starting Smart Irrigation API Server...")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)