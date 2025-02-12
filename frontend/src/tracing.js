import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { DocumentLoadInstrumentation } from "@opentelemetry/instrumentation-document-load";
import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch";
import { XMLHttpRequestInstrumentation } from "@opentelemetry/instrumentation-xml-http-request";

// Ensure process.env exists safely
const getEnvVar = (key, fallback) => {
  return typeof process !== "undefined" && process.env && process.env[key] ? process.env[key] : fallback;
};

const provider = new WebTracerProvider();

const exporter = new OTLPTraceExporter({
  url: getEnvVar("REACT_APP_OTEL_EXPORTER_URL", "http://localhost:4318/v1/traces"),
  headers: {},
});

provider.addSpanProcessor(new BatchSpanProcessor(exporter));
provider.register();

registerInstrumentations({
  instrumentations: [
    new DocumentLoadInstrumentation(),
    new FetchInstrumentation(),
    new XMLHttpRequestInstrumentation(),
  ],
});

const fetchInstrumentation = new FetchInstrumentation({
  applyCustomAttributesOnSpan(span) {
    span.setAttribute("http.method", "GET");
  },
});
registerInstrumentations({
  instrumentations: [fetchInstrumentation],
});


console.log("✅ OpenTelemetry initialized in frontend");
