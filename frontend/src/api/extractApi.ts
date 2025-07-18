import api from './client';
import type { ExtractedPatientData } from './types';

export const analyzeTranscript = async (
  transcript: string
): Promise<ExtractedPatientData> => {
  const response = await api.post('/extract', { transcript });
  return response.data.extracted;
};
