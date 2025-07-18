from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.llm_service import extract_patient_data

router = APIRouter()

class TranscriptRequest(BaseModel):
    transcript: str

@router.post("/extract")
async def extract(transcript_request: TranscriptRequest):
    try:
        result = extract_patient_data(transcript_request.transcript)
        return {"extracted": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
