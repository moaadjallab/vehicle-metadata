import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  CircularProgress, 
  Alert,
  Chip,
  TextField,
  Box,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import { useState, useMemo } from 'react';
import { useGetSignalsQuery } from '../features/api/apiSlice';
import CreateDataRequestModal from './CreateDataRequestModal';

function SignalList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSignalId, setSelectedSignalId] = useState<string | null>(null);
  

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  const { data: signals, isLoading, error } = useGetSignalsQuery();


  const filteredSignals = useMemo(() => {
    if (!signals) return [];

    return signals.filter((signal) => {
      const matchesSearch = 
        signal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        signal.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        categoryFilter === '' || signal.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [signals, searchTerm, categoryFilter]);


  const categories = useMemo(() => {
    if (!signals) return [];
    return Array.from(new Set(signals.map(s => s.category)));
  }, [signals]);

  const handleCreateRequest = (signalId: string) => {
    setSelectedSignalId(signalId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSignalId(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Alert severity="error">Failed to load signals</Alert>;
  }

  return (
    <>

      <Paper className="p-4 mb-4 shadow-sm">
        <Box className="flex gap-4">
          <TextField
            placeholder="Search signals..."
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              label="Category"
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        

        <Box className="mt-2">
          <Typography variant="caption" color="text.secondary">
            Showing {filteredSignals.length} of {signals?.length} signals
          </Typography>
        </Box>
      </Paper>


      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell className="font-bold">Name</TableCell>
              <TableCell className="font-bold">Category</TableCell>
              <TableCell className="font-bold">Description</TableCell>
              <TableCell className="font-bold" align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSignals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" className="text-gray-500 py-8">
                  No signals match your search criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredSignals.map((signal) => (
                <TableRow key={signal.id} hover>
                  <TableCell className="font-medium">{signal.name}</TableCell>
                  <TableCell>
                    <Chip label={signal.category} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell className="text-gray-600">{signal.description}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => handleCreateRequest(signal.id)}
                    >
                      Create Request
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateDataRequestModal
        open={modalOpen}
        onClose={handleCloseModal}
        preSelectedSignalId={selectedSignalId}
      />
    </>
  );
}

export default SignalList;