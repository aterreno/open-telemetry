# OpenTelemetry Monitoring with Frontend & Backend

This project provides a complete monitoring stack using OpenTelemetry, Prometheus, Grafana, Jaeger, and Loki to trace and monitor both frontend (React) and backend (FastAPI) applications.

## 📌 Features
- ✅ **Frontend Monitoring**: OpenTelemetry tracing and Core Web Vitals (React)
- ✅ **Backend Monitoring**: OpenTelemetry tracing and logs (FastAPI)
- ✅ **Metrics Collection**: Prometheus
- ✅ **Distributed Tracing**: Jaeger
- ✅ **Logging**: Loki
- ✅ **Visualization**: Grafana
- ✅ **Uptime Monitoring**: Blackbox Exporter

---

## 🚀 1. Prerequisites
Ensure you have **Docker and Docker Compose** installed:
```sh
# Check Docker
docker -v
# Check Docker Compose
docker compose version
```
If not installed, install **Docker Desktop** from: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

---

## 🔧 2. Installation & Setup
### 1️⃣ **Clone this repository**
```sh
git clone <repository-url>
cd opentelemetry-monitoring
```

### 2️⃣ **Start all services**
```sh
docker compose up --build -d
```
This will start the following services:
- `backend` (FastAPI)
- `frontend` (React)
- `otel-collector` (OpenTelemetry Collector)
- `jaeger` (Tracing UI)
- `prometheus` (Metrics collection)
- `grafana` (Dashboard UI)
- `loki` (Logging)
- `blackbox-exporter` (Uptime monitoring)

### 3️⃣ **Verify Running Containers**
```sh
docker ps
```

---

## 📊 3. Accessing Monitoring Tools
- **Frontend** → [http://localhost:3001](http://localhost:3001)
- **Backend API Docs** → [http://localhost:8000/docs](http://localhost:8000/docs)
- **Jaeger (Traces)** → [http://localhost:16686](http://localhost:16686)
- **Prometheus (Metrics)** → [http://localhost:9090](http://localhost:9090)
- **Grafana (Dashboards)** → [http://localhost:3000](http://localhost:3000) (`admin/admin`)

---

## 🛠 4. Stopping Services
To stop and remove all running containers:
```sh
docker compose down
```

---

## 🎯 5. Troubleshooting
### **1️⃣ Logs for Services**
```sh
docker logs frontend  # View frontend logs
docker logs backend   # View backend logs
docker logs otel-collector  # View OpenTelemetry logs
```
### **2️⃣ Rebuild Everything**
If something isn’t working, try:
```sh
docker compose down
rm -rf frontend/node_modules backend/__pycache__
docker compose build
docker compose up -d
```

---

## 📜 6. Folder Structure
```
├── backend/  # FastAPI Backend
│   ├── main.py  # API with OpenTelemetry
│   ├── Dockerfile
│   ├── requirements.txt
├── frontend/  # React Frontend
│   ├── src/
│   │   ├── index.js  # React entry file
│   │   ├── tracing.js  # OpenTelemetry Setup
│   ├── Dockerfile
│   ├── package.json
├── otel-config.yaml  # OpenTelemetry Collector Configuration
├── prometheus.yml  # Prometheus Configuration
├── blackbox.yml  # Blackbox Exporter Configuration
├── docker-compose.yml  # Docker Setup
└── README.md  # Documentation
```

---

## 🎉 7. Contributing
Feel free to open issues and submit pull requests!

---

## 📄 8. License
This project is licensed under the **MIT License**. See `LICENSE` for details.

