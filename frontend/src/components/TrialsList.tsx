import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import {
  Typography,
  Box,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import type { ClinicalTrial } from '../api/types';
import TrialCard from './TrialCard';

interface TrialsListProps {
  trials: ClinicalTrial[];
}

const TrialsList: React.FC<TrialsListProps> = ({ trials }) => {
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Unique statuses for filter
  const statuses = Array.from(new Set(trials.map(t => t.status))).sort();

  const filteredTrials = statusFilter === 'All'
    ? trials
    : trials.filter(t => t.status === statusFilter);

  return (
    <Box sx={{ mt: 4, px: 4 }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        color="primary"
        gutterBottom
        textAlign="center"
      >
        Matching Clinical Trials
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ mb: 4, flexWrap: 'wrap' }}
        justifyContent="center"
      >
        <Typography variant="body1">Filter by Status:</Typography>
        <Select
          size="small"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          {statuses.map((s) => (
            <MenuItem key={s} value={s}>{s}</MenuItem>
          ))}
        </Select>
      </Stack>

      <Grid container spacing={3}>
        {filteredTrials.map((trial) => (
            <Grid size={4} key={trial.nctId}>
                <TrialCard trial={trial} />
            </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TrialsList;
