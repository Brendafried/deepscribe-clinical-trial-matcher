import React from 'react';
import { TextField, Button, Card, CardContent, Typography, CircularProgress, Stack, Box } from '@mui/material';

interface TranscriptInputProps {
  transcript: string;
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
  onAnalyze: () => void;
  loading: boolean;
}

const TranscriptInput: React.FC<TranscriptInputProps> = ({
  transcript,
  setTranscript,
  onAnalyze,
  loading
}) => {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
        <Card variant="outlined" sx={{ p: 3, mb: 4, boxShadow: 3 }}>
        <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
            Doctor-Patient Transcript
            </Typography>
            <Stack spacing={2}>
            <TextField
                label="Transcript"
                multiline
                rows={18}
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                fullWidth
                variant="outlined"
                placeholder='Enter/Paste the transcript text here...'
            />
            <Button
                variant="contained"
                size="large"
                onClick={onAnalyze}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Analyze Transcript'}
            </Button>
            </Stack>
        </CardContent>
        </Card>
    </Box>
  );
};

export default TranscriptInput;
