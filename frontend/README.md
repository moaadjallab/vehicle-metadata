# Vehicle Metadata Frontend

## Description
React frontend for vehicle signal metadata management with EU Data Act compliance tracking.

## Tech Stack
- React 18
- Vite
- TypeScript
- Redux Toolkit + RTK Query
- Material UI
- Tailwind CSS

## Run Instructions

### Prerequisites
- Node.js 18+ installed
- Backend running on http://localhost:8080

### Install dependencies
```bash
cd frontend
npm install
```

### Start development server
```bash
npm run dev
```

The frontend will start on **http://localhost:3000**

### Build for production
```bash
npm run build
```

## Features
- **Signal List**: Browse vehicle signals with search and category filtering
- **Create Data Request**: Modal dialog to create requests linking signals to legal purposes
- **Data Requests Dashboard**: View and manage requests with status updates via dropdown menu
- **Audit Panel**: Read-only drawer showing request details and timestamps for compliance

## Configuration
Vite proxy is configured to forward API calls to the backend. See `vite.config.ts`.
