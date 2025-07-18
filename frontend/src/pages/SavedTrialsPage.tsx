import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import TrialCard from '../components/TrialCard';
import type { ClinicalTrial } from '../api/types';

const SavedTrialsPage: React.FC = () => {
  const [savedTrials, setSavedTrials] = useState<ClinicalTrial[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('savedTrials') || '[]');
    setSavedTrials(stored);
  }, []);

  const handleClear = () => {
    localStorage.removeItem('savedTrials');
    setSavedTrials([]);
  };

  if (savedTrials.length === 0) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          No Saved Clinical Trials
        </Typography>
        <Typography variant="body1" color="text.secondary">
          You haven’t saved any trials yet. Go explore and bookmark trials to see them here.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, px: 4 }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        color="primary"
        gutterBottom
        textAlign="center"
      >
        Saved Clinical Trials
      </Typography>

      <Button
        variant="outlined"
        color="secondary"
        sx={{ my: 2 }}
        onClick={handleClear}
      >
        Clear All Saved Trials
      </Button>

      <Grid container spacing={3}>
        {savedTrials.map((trial) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={trial.nctId}>
            <TrialCard trial={trial} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SavedTrialsPage;
