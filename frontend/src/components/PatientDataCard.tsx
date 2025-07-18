import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Divider,
  TextField,
  CircularProgress
} from '@mui/material';
import type { ExtractedPatientData } from '../api/types';

interface PatientDataCardProps {
  data: ExtractedPatientData;
  setData: React.Dispatch<React.SetStateAction<ExtractedPatientData>>;
  onFindTrials: () => void;
  loading: boolean;
}

const PatientDataCard: React.FC<PatientDataCardProps> = ({ data, setData, onFindTrials, loading }) => {

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(prev => ({
      ...prev,
      location: e.target.value
    }));
  };

  return (
    <Card variant="outlined" sx={{ p: 3, mb: 4, boxShadow: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom color="primary">
          🩺 Extracted Patient Data
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          <Typography><strong>Age:</strong> {data.age || 'Not specified'}</Typography>
          <Typography><strong>Sex:</strong> {data.sex || 'Not specified'}</Typography>
          <Typography><strong>Diagnosis:</strong> {data.diagnosis || 'Not specified'}</Typography>
          <Typography><strong>Stage:</strong> {data.cancer_stage || 'Not specified'}</Typography>
          <Typography><strong>Genetic Markers:</strong> {data.genetic_markers || 'Not specified'}</Typography>
          
          <TextField
            label="Location"
            variant="outlined"
            value={data.location || ''}
            onChange={handleLocationChange}
            required
            fullWidth
          />
        </Stack>

        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 3 }}
          size="large"
          onClick={onFindTrials}
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : '🔎 Find Clinical Trials'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PatientDataCard;
