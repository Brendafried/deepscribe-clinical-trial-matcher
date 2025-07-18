import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
  IconButton,
  Tooltip
} from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import type { ClinicalTrial } from '../api/types';
import { simplifyTrialSummary } from '../api/clinicalTrialsApi';

const statusColors: Record<string, string> = {
  RECRUITING: '#2e7d32',
  COMPLETED: '#1976d2',
  TERMINATED: '#d32f2f',
  ACTIVE_NOT_RECRUITING: '#f57c00',
  DEFAULT: '#616161',
};

interface TrialCardProps {
  trial: ClinicalTrial;
}

const TrialCard: React.FC<TrialCardProps> = ({ trial }) => {
  const [simplified, setSimplified] = useState<string | null>(null);
  const [loadingSimplify, setLoadingSimplify] = useState(false);
  const [saved, setSaved] = useState(checkIfSaved(trial.nctId));
  const [expanded, setExpanded] = useState(false);

  const handleSimplify = async () => {
    setLoadingSimplify(true);
    try {
      const result = await simplifyTrialSummary(trial.summary);
      setSimplified(result);
      setExpanded(true);
    } catch {
      alert('Error simplifying summary.');
    } finally {
      setLoadingSimplify(false);
    }
  };

  const handleSaveToggle = () => {
    if (saved) {
      unsaveTrial(trial.nctId);
      setSaved(false);
    } else {
      saveTrial(trial);
      setSaved(true);
    }
  };

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxWidth: 500,
        mx: 'auto',
        my: 4,
        py: 2,
      }}
    >
      {/* Status Banner */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: 0,
          bgcolor: statusColors[trial.status] || statusColors.DEFAULT,
          color: 'white',
          px: 2,
          py: 0.5,
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
          fontSize: '0.75rem',
          fontWeight: 'bold',
          letterSpacing: 0.5,
          boxShadow: 1,
          maxWidth: '75%',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {trial.status.replace(/_/g, ' ')}
      </Box>

      {/* Bookmark Save Button */}
      <IconButton
        onClick={handleSaveToggle}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: saved ? 'secondary.main' : 'grey.500'
        }}
      >
        {saved ? (
          <Tooltip title="Remove from Saved">
            <BookmarkIcon />
          </Tooltip>
        ) : (
          <Tooltip title="Save Trial">
            <BookmarkBorderIcon />
          </Tooltip>
        )}
      </IconButton>

      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom sx={{ py: 2}}>
          {trial.title}
        </Typography>

        {/* Simplified Label */}
        {simplified && (
          <Typography variant="subtitle2" color="primary" sx={{ mb: 1, fontWeight: 'bold' }}>
            Simplified for Patients
          </Typography>
        )}

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            flexGrow: 1,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: expanded ? 'unset' : 6,
            WebkitBoxOrient: 'vertical',
            whiteSpace: expanded ? 'normal' : 'initial'
          }}
        >
          {simplified || trial.summary}
        </Typography>

        {/* See More / See Less */}
        <Button
          variant="text"
          size="small"
          onClick={() => setExpanded(!expanded)}
          sx={{ textTransform: 'none', alignSelf: 'start', mb: 1 }}
        >
          {expanded ? 'See Less' : 'See More'}
        </Button>

        <Stack spacing={1}>
          <Button
            variant="outlined"
            size="small"
            onClick={handleSimplify}
            disabled={loadingSimplify}
            fullWidth
          >
            {loadingSimplify ? 'Simplifying...' : 'Simplify for Patients'}
          </Button>

          <Button
            variant="contained"
            color="primary"
            size="small"
            href={trial.link}
            target="_blank"
            rel="noopener"
            fullWidth
          >
            Learn More
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TrialCard;

const saveTrial = (trial: ClinicalTrial) => {
  const saved = JSON.parse(localStorage.getItem('savedTrials') || '[]');
  localStorage.setItem('savedTrials', JSON.stringify([...saved, trial]));
};

const unsaveTrial = (nctId: string) => {
  const saved = JSON.parse(localStorage.getItem('savedTrials') || '[]');
  const updated = saved.filter((t: ClinicalTrial) => t.nctId !== nctId);
  localStorage.setItem('savedTrials', JSON.stringify(updated));
};

const checkIfSaved = (nctId: string) => {
  const saved = JSON.parse(localStorage.getItem('savedTrials') || '[]');
  return saved.some((t: ClinicalTrial) => t.nctId === nctId);
};
