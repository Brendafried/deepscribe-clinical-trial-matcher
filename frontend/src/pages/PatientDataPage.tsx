import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import PatientDataCard from '../components/PatientDataCard';
import type { ExtractedPatientData, ClinicalTrial } from '../api/types';
import { findClinicalTrials } from '../api/clinicalTrialsApi';

const PatientDataPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { patientData: initialData } = location.state as { patientData: ExtractedPatientData };
  const [patientData, setPatientData] = useState<ExtractedPatientData>(initialData);
  const [trials, setTrials] = useState<ClinicalTrial[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFindTrials = async () => {
    setLoading(true);
    try {
      const trials = await findClinicalTrials(patientData.diagnosis, patientData.location);

      setTrials(trials);
    } catch (e) {
      alert('Error finding clinical trials.');
    } finally {
      setLoading(false);
    }
  };

  // Watch for when trials are set and navigate
  useEffect(() => {
    if (trials.length > 0) {
      navigate('/trials', { state: { trials } });
    }
  }, [trials, navigate]);

  if (!patientData) {
    return (
      <Box p={4}>
        <Typography variant="h6" color="error" textAlign="center">
          No patient data found. Please go back and analyze a transcript first.
        </Typography>
      </Box>
    );
  }

  return (
    <Box maxWidth="md" mx="auto" my={4} px={2}>
      <Typography
        variant="h5"
        fontWeight="bold"
        color="primary"
        gutterBottom
        textAlign="center"
      >
        Review Extracted Patient Data
      </Typography>

      <PatientDataCard
        data={patientData}
        setData={setPatientData}
        onFindTrials={handleFindTrials}
        loading={loading}
        />

    </Box>
  );
};

export default PatientDataPage;
