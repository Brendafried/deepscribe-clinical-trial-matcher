import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TranscriptPage from './pages/TranscriptPage';
import PatientDataPage from './pages/PatientDataPage';
import TrialsPage from './pages/TrialsPage';
import SavedTrialsPage from './pages/SavedTrialsPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<TranscriptPage />} />
        <Route path="/patient-data" element={<PatientDataPage />} />
        <Route path="/trials" element={<TrialsPage />} />
        <Route path="/saved" element={<SavedTrialsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
