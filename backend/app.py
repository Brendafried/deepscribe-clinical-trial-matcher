from fastapi import FastAPI
from routes import extract, clinical_trials

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="DeepScribe Clinical Trial Matcher",
    version="1.0.0"
)

# Add CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(extract.router)
app.include_router(clinical_trials.router)
