import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TranscriptInput from '../components/TranscriptInput';
import { analyzeTranscript } from '../api/extractApi';

const TranscriptPage: React.FC = () => {
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!transcript.trim()) {
      alert('Please enter a transcript first.');
      return;
    }

    setLoading(true);
    try {
      const extracted = await analyzeTranscript(transcript);
      navigate('/patient-data', { state: { patientData: extracted } });
    } catch (e) {
      alert('Error analyzing transcript.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TranscriptInput
      transcript={transcript}
      setTranscript={setTranscript}
      onAnalyze={handleAnalyze}
      loading={loading}
    />
  );
};

export default TranscriptPage;
