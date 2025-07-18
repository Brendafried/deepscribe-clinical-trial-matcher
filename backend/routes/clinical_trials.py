from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.clinical_trials_service import fetch_clinical_trials
from services.llm_service import simplify_trial_summary

router = APIRouter()

class ClinicalTrialRequest(BaseModel):
    condition: str
    location: str

class SimplifyRequest(BaseModel):
    summary: str

@router.post("/clinical-trials")
def get_clinical_trials(request: ClinicalTrialRequest):
    try:
        trials = fetch_clinical_trials(request.condition, request.location)
        return {"trials": trials}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/simplify-summary")
def simplify_summary(request: SimplifyRequest):
    try:
        simplified = simplify_trial_summary(request.summary)
        return {"simplified": simplified}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

