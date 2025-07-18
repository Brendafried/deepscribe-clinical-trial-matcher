# DeepScribe Clinical Trial Matcher

A full-stack application that matches simplified patient summaries to clinical trials using modern web technologies and LLMs.

---

## Overview of Approach

This application allows users to input free-text patient summaries. The backend uses an AI model to extract key clinical details (e.g., condition, location, age, gender) and then queries the ClinicalTrials.gov database to find relevant matches.

Users can:
- See simplified summaries of clinical trials.
- Filter by recruitment status.
- Bookmark trials locally in their browser for later review.
---
- **Frontend**: React + Material UI  
- **Backend**: FastAPI  
- **AI**: Uses OpenAI to extract patient information and simplify trial summaries

---

## Deployed Demo

- [🌐 Frontend (Vercel)](https://deepscribe-clinical-trial-matcher-r4k4bdb9s.vercel.app)  
- [🔗 Backend API (Render)](https://deepscribe-clinical-trial-matcher-1.onrender.com)
- For a sample doctor-patient trancript you can use the one in transcripts/sample_trancript.txt and paste it in the app
---

## Prerequisites

Make sure the following are installed on your system:

- [Docker](https://www.docker.com/) and Docker Compose
- [Make](https://www.gnu.org/software/make/)
- [Node.js](https://nodejs.org/) (if running frontend locally)
- [Python 3.10+](https://www.python.org/) and `venv` (if running backend locally)
- An OpenAI API key

---

## Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/deepscribe-clinical-trial-matcher.git
cd deepscribe-clinical-trial-matcher
```

### 2. Set up Environment Variables
```bash
cd backend
touch .env
```

### 3. Run with Docker
```bash
cd deepscribe-clinical-trial-matcher
make deploy
```
Frontend will run on http://localhost:3000

Backend API will run on http://localhost:8000

### 4. Run Without Docker
Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Frontend
```bash
cd frontend
npm install
npm run dev
```
Visit: http://localhost:5173



