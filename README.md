
# 🏎️ AI-Powered F1 Telemetry & Race Strategy Platform

A production-grade Formula 1 telemetry analytics and race strategy intelligence platform built using FastAPI, Next.js, WebSockets, PostgreSQL/TimescaleDB, and Machine Learning.

The platform simulates a modern F1 race engineering environment by combining real-time telemetry streaming, AI-powered tire degradation prediction, pit strategy optimization, driver performance analytics, historical race replay, and interactive motorsport engineering dashboards.

Inspired by the race engineering systems used by professional Formula 1 teams.

---

## 📌 Overview

Formula 1 teams rely heavily on telemetry and strategy systems to make race-critical decisions. This project recreates a simplified version of a professional F1 engineering platform by collecting telemetry data, processing it in real time, applying machine learning models for predictions, and delivering actionable race strategy insights through a modern engineering dashboard.

The platform combines:

- Real-time telemetry streaming
- AI-powered strategy recommendations
- Tire degradation prediction
- Pit-stop optimization
- Driver analytics
- Historical telemetry replay
- Motorsport-focused data visualization
- Time-series data management

---

## 🚀 Features

### 📡 Real-Time Telemetry Streaming

- Live Speed Monitoring
- RPM Tracking
- Gear Position Monitoring
- Throttle Position Tracking
- Brake Pressure Monitoring
- Tire Temperature Analysis
- Fuel Consumption Tracking
- ERS Deployment Monitoring
- DRS Status Tracking
- Sector Timing Visualization

---

### 🧠 AI Strategy Engine

The platform continuously analyzes telemetry data and provides strategic recommendations.

Capabilities include:

- Tire Wear Prediction
- Tire Life Estimation
- Optimal Pit Window Calculation
- Race Pace Analysis
- Pit Strategy Optimization
- Real-Time Strategy Recommendations

Example Outputs:

```text
Maintain Current Pace

Pit Window Approaching

BOX BOX BOX
```

---

### 📊 Driver Performance Analytics

Analyze and compare driver performance using:

- Consistency Scoring
- Aggression Analysis
- Throttle Smoothness
- Braking Efficiency
- Sector Performance Comparison
- Corner Entry Speed Analysis
- Corner Exit Speed Analysis
- Tire Management Efficiency

---

### 🏁 Race Strategy Simulator

Simulate different race scenarios:

- One-stop strategies
- Two-stop strategies
- Tire compound selection
- Safety Car scenarios
- Fuel management strategies
- Predicted finishing positions

---

### 🎥 Historical Replay Mode

Using FastF1 integration:

- Replay historical sessions
- Compare drivers
- Analyze race pace
- Review strategy decisions
- Visualize telemetry evolution over time

---

## 🏗️ System Architecture

```text
                      ┌─────────────────────┐
                      │     FastF1 Data     │
                      │ Historical Sessions │
                      └──────────┬──────────┘
                                 │
                                 ▼

┌─────────────────────────────────────────────────────────┐
│                 TELEMETRY LAYER                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Synthetic Telemetry Generator                           │
│ FastF1 Historical Replay Engine                         │
│ Session Data Loader                                     │
│                                                         │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼

┌─────────────────────────────────────────────────────────┐
│                   FASTAPI BACKEND                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ REST API                                                │
│ WebSocket Server                                        │
│ Telemetry Processor                                     │
│ Session Manager                                         │
│ Authentication Layer                                    │
│                                                         │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼

┌─────────────────────────────────────────────────────────┐
│                  AI / ML ENGINE                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Tire Wear Predictor                                     │
│ Lap Time Predictor                                      │
│ Race Pace Analyzer                                      │
│ Pit Strategy Optimizer                                  │
│ Strategy Recommendation Engine                          │
│                                                         │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼

┌─────────────────────────────────────────────────────────┐
│             POSTGRESQL + TIMESCALEDB                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Telemetry Storage                                       │
│ Session History                                         │
│ Driver Data                                             │
│ Strategy Records                                        │
│ AI Predictions                                          │
│                                                         │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼

┌─────────────────────────────────────────────────────────┐
│                NEXT.JS FRONTEND                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Live Dashboard                                          │
│ Strategy Panel                                          │
│ Analytics Page                                          │
│ Replay Interface                                        │
│ Driver Comparison                                       │
│ Track Visualization                                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Architecture

```text
Telemetry Source
      │
      ▼
Telemetry Generator / FastF1
      │
      ▼
FastAPI Backend
      │
      ▼
Telemetry Processing Layer
      │
      ├────────────► TimescaleDB Storage
      │
      ▼
Machine Learning Models
      │
      ▼
Strategy Engine
      │
      ▼
WebSocket Broadcast
      │
      ▼
Next.js Dashboard
      │
      ▼
Live Engineering Insights
```

---

## 🧠 Machine Learning Pipeline

### Tire Wear Prediction

Inputs:

- Tire Temperature
- Current Tire Wear
- Lap Number
- Driver Aggression
- Average Speed
- Track Conditions

Outputs:

- Remaining Tire Life
- Future Tire Wear
- Optimal Pit Window

---

### Lap Time Prediction

Inputs:

- Tire Age
- Fuel Load
- Track Temperature
- Driver Pace
- Sector Performance

Outputs:

- Predicted Lap Time
- Pace Evolution
- Performance Drop-Off

---

### Strategy Optimization

Inputs:

- Tire Condition
- Race Position
- Fuel Status
- Traffic Conditions
- Track Evolution

Outputs:

- Recommended Pit Lap
- Tire Compound Selection
- Strategy Recommendation

---

## 📡 Real-Time WebSocket Infrastructure

### Telemetry Stream

Endpoint:

```text
/ws/telemetry
```

Frequency:

```text
10Hz
```

Purpose:

- Speed updates
- RPM updates
- Gear changes
- Tire telemetry
- Fuel telemetry

---

### Strategy Stream

Endpoint:

```text
/ws/strategy
```

Frequency:

```text
1Hz
```

Purpose:

- Strategy updates
- Tire predictions
- Pit recommendations
- AI insights

---

## 🗄️ Database Design

### Sessions

Stores:

- Race Session
- Circuit Information
- Weather Conditions
- Session Metadata

---

### Telemetry

Stores:

- Speed
- RPM
- Gear
- Throttle
- Brake Pressure
- Tire Temperatures
- Fuel Load
- ERS Data
- DRS Data

---

### Predictions

Stores:

- Tire Wear Predictions
- Pit Strategies
- Lap Time Forecasts
- AI Recommendations

---

## 📊 Dashboard Modules

### Live Telemetry Dashboard

Features:

- Live Speed Chart
- RPM Chart
- Tire Temperature Monitoring
- Fuel Usage Monitoring
- Telemetry Stream Viewer

---

### AI Strategy Dashboard

Features:

- Tire Wear Forecast
- Pit Window Recommendation
- Race Pace Analysis
- Strategy Suggestions

---

### Driver Analytics Dashboard

Features:

- Driver Comparison
- Sector Analysis
- Consistency Scoring
- Aggression Metrics
- Pace Comparison

---

## 📁 Project Structure

```text
f1-telemetry/

├── backend/
│   ├── api/
│   ├── telemetry/
│   ├── websocket/
│   ├── ml_models/
│   ├── strategy_engine/
│   ├── database/
│   ├── services/
│   └── main.py
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── analytics/
│   ├── telemetry/
│   ├── strategy/
│   ├── services/
│   └── public/
│
├── datasets/
├── notebooks/
├── docker/
├── docs/
└── tests/
```

---

## ⚙️ Tech Stack

### Frontend

- Next.js 14
- React
- TypeScript
- TailwindCSS
- Recharts
- Framer Motion
- Zustand

---

### Backend

- FastAPI
- Python
- WebSockets
- SQLAlchemy
- Pydantic

---

### Machine Learning

- Scikit-Learn
- XGBoost
- PyTorch (Planned)
- Pandas
- NumPy

---

### Database

- PostgreSQL
- TimescaleDB

---

### Infrastructure

- Docker
- Docker Compose
- Nginx

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/kishoresrinivasan2005/F1-telementry.git

cd F1-telementry
```

---

### Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs at:

```text
http://localhost:8000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

---

### Docker Setup

Run the complete stack:

```bash
docker-compose up --build
```

---

## 📈 Current Progress

### Phase 1

- [x] FastAPI Backend
- [x] Next.js Frontend
- [x] Synthetic Telemetry Generator
- [x] WebSocket Streaming
- [x] Live Dashboard

### Phase 2

- [x] Tire Wear Prediction
- [x] Strategy Engine
- [x] AI Strategy Dashboard

### Phase 3

- [ ] FastF1 Integration
- [ ] Historical Replay System
- [ ] Multi-Driver Comparison
- [ ] Track Map Visualization

### Phase 4

- [ ] XGBoost Tire Models
- [ ] LSTM Lap Time Prediction
- [ ] Reinforcement Learning Strategy Engine

### Phase 5

- [ ] AI Race Engineer Assistant
- [ ] Full Race Simulation Engine
- [ ] Safety Car Prediction
- [ ] Predictive Race Outcome Engine

---

## 🎯 Future Enhancements

- Full FastF1 Telemetry Integration
- Real Circuit Track Maps
- Race Replay System
- Multi-Car Telemetry Analysis
- AI Race Engineer Chatbot
- Reinforcement Learning Strategy Agent
- Predictive Race Outcome Models
- Driver Risk Analysis
- Tire Overheating Detection
- Dynamic Weather Simulation

---

## 📚 Learning Outcomes

This project demonstrates expertise in:

- Real-Time Systems
- Event-Driven Architecture
- Machine Learning Integration
- WebSocket Communication
- Time-Series Databases
- Motorsport Analytics
- Backend Engineering
- Frontend Engineering
- Data Visualization
- AI-Assisted Decision Making

---

## 👨‍💻 Author

**Kishore Srinivasan**

Interests:

- Formula 1 Engineering
- Motorsport Analytics
- Artificial Intelligence
- Data Engineering
- Real-Time Systems
- Machine Learning

GitHub:
https://github.com/kishoresrinivasan2005

---

## ⭐ Support

If you found this project useful:

⭐ Star the repository

🍴 Fork the project

🐛 Report issues

🚀 Contribute to the project

---

## 🏁 Final Vision

The ultimate goal of this project is to evolve into a fully featured Formula 1 Engineering Intelligence Platform capable of real-time telemetry analysis, AI-assisted strategy recommendations, historical race replay, predictive analytics, and advanced motorsport decision support systems.

Built with a passion for Formula 1, Artificial Intelligence, and Motorsport Engineering.
