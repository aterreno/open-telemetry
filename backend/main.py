from urllib.request import Request
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
import logging
logging.basicConfig(level=logging.INFO)
import time

# OpenTelemetry Setup
trace.set_tracer_provider(TracerProvider())
tracer = trace.get_tracer(__name__)
otlp_exporter = OTLPSpanExporter(endpoint="http://otel-collector:4317")
span_processor = BatchSpanProcessor(otlp_exporter)
trace.get_tracer_provider().add_span_processor(span_processor)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ✅ Allow requests from any frontend (Change for security)
    allow_credentials=True,
    allow_methods=["*"],  # ✅ Allow all HTTP methods
    allow_headers=["*"],  # ✅ Allow all headers
)

@app.get("/")
def read_root():
    with tracer.start_as_current_span("root_endpoint"):
        time.sleep(0.2)  # Simulate processing time
        return {"message": "Hello, World!"}

@app.get("/data")
def get_data():
    with tracer.start_as_current_span("fetch_data"):
        time.sleep(0.5)  # Simulate DB call
        return {"data": "Some backend response"}


@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    logging.info(f"Request {request.url} took {duration:.2f}s")
    return response
