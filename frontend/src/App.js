import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then((data) => console.log("Backend Response:", data));
  }, []);

  return (
    <div>
      <h1>React App with OpenTelemetry</h1>
      <p>Frontend tracing and Core Web Vitals are active.</p>
    </div>
  );
}

export default App;
