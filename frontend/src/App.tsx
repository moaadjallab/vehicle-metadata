import { Container, Box, Typography, Tabs, Tab, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import { theme } from './theme';
import SignalList from './components/SignalList';
import DataRequestsDashboard from './components/DataRequestsDashboard';

function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Container maxWidth="lg" className="py-8">
          <Box className="mb-6">
            <Typography variant="h3" component="h1" className="font-bold mb-2" color="primary">
              Vehicle Metadata Manager
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              EU Data Act Compliance Tool
            </Typography>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Signals" />
              <Tab label="Data Requests" />
            </Tabs>
          </Box>

          {tabValue === 0 && <SignalList />}
          {tabValue === 1 && <DataRequestsDashboard />}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;