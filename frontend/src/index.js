import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./tracing"; // Import OpenTelemetry setup
import { onCLS, onINP, onLCP } from "web-vitals";

function reportVitals(metric) {
  fetch("http://localhost:4318/v1/metrics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: metric.name,
      value: metric.value,
      id: metric.id,
    }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  })
  .catch(error => console.error("Error posting Web Vitals:", error));
}

onCLS(reportVitals);
onINP(reportVitals);
onLCP(reportVitals);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

