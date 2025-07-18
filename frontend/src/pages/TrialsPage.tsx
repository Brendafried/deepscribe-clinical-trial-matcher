import React from 'react';
import { useLocation} from 'react-router-dom';
import { Box, Typography} from '@mui/material';
import TrialsList from '../components/TrialsList';
import type { ClinicalTrial } from '../api/types';

const TrialsPage: React.FC = () => {
  const location = useLocation();
  const { trials } = location.state as { trials: ClinicalTrial[] };

  if (!trials || trials.length === 0) {
    return (
        
      <Box p={4}>
        <Typography variant="h6" color="text.secondary" textAlign="center">
          No matching clinical trials were found for this patient.
        </Typography>
      </Box>
    );
  }

  return (
    <TrialsList trials={trials} />
  );
};

export default TrialsPage;
