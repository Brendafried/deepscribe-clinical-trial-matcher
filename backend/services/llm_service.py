import os
import re
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def build_prompt(transcript: str) -> str:
    return f"""
Extract the following fields from this doctor-patient conversation transcript:

- Age
- Sex
- Diagnosis
- Cancer type/stage
- Relevant genetic markers
- Location

Return your answer as strict JSON with these keys:

{{
  "age": "",
  "sex": "",
  "diagnosis": "",
  "cancer_stage": "",
  "genetic_markers": "",
  "location": ""
}}

Transcript:

\"\"\"{transcript}\"\"\"
"""

def clean_llm_response(text: str) -> dict:
    cleaned = re.sub(r"```[a-z]*\n", "", text, flags=re.IGNORECASE)
    cleaned = cleaned.replace("```", "").strip()
    return json.loads(cleaned)

def extract_patient_data(transcript: str) -> dict:
    prompt = build_prompt(transcript)
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a helpful medical assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    raw_output = response.choices[0].message.content
    return clean_llm_response(raw_output)

def simplify_trial_summary(summary: str) -> str:
    prompt = (
        "Please rewrite the following clinical trial description in plain, "
        "patient-friendly language that is easy to understand:\n\n"
        f"{summary}"
    )

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a helpful medical assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content.strip()

