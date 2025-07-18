import api from './client';
import type { ClinicalTrial } from './types';

export const findClinicalTrials = async (
  condition: string,
  location: string
): Promise<ClinicalTrial[]> => {
  const response = await api.post('/clinical-trials', {
    condition,
    location,
  });
  return response.data.trials;
};


export const simplifyTrialSummary = async (
    summary: string
  ): Promise<string> => {
    const response = await api.post('/simplify-summary', { summary });
    return response.data.simplified;
  };

