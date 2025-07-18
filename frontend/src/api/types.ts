export interface TranscriptRequest {
    transcript: string;
  }
  
  export interface ExtractedPatientData {
    age: string;
    sex: string;
    diagnosis: string;
    cancer_stage: string;
    genetic_markers: string;
    location: string;
  }
  
  export interface ClinicalTrial {
    nctId: string;
    title: string;
    status: string;
    summary: string;
    link: string;
  }
  