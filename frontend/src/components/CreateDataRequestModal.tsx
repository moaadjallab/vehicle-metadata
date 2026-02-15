import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useState, useEffect } from 'react';
import {
  useGetSignalsQuery,
  useGetLegalPurposesQuery,
  useCreateDataRequestMutation,
} from '../features/api/apiSlice';

interface CreateDataRequestModalProps {
  open: boolean;
  onClose: () => void;
  preSelectedSignalId?: string | null;
}

function CreateDataRequestModal({ open, onClose, preSelectedSignalId }: CreateDataRequestModalProps) {
  const [signalId, setSignalId] = useState('');
  const [legalPurposeId, setLegalPurposeId] = useState('');


  const { data: signals } = useGetSignalsQuery();
  const { data: legalPurposes } = useGetLegalPurposesQuery();
  const [createDataRequest, { isLoading, error, isSuccess }] = useCreateDataRequestMutation();


  useEffect(() => {
    if (preSelectedSignalId) {
      setSignalId(preSelectedSignalId);
    }
  }, [preSelectedSignalId]);


  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess]);

  const handleClose = () => {
    setSignalId('');
    setLegalPurposeId('');
    onClose();
  };

  const handleSubmit = async () => {
    if (!signalId || !legalPurposeId) return;

    await createDataRequest({
      signalId,
      legalPurposeId,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle className="bg-gray-50 font-bold">Create Data Request</DialogTitle>
      
      <DialogContent className="mt-4">
        {error && (
          <Alert severity="error" className="mb-4">
            Failed to create data request
          </Alert>
        )}

        <FormControl fullWidth className="mb-4">
          <InputLabel>Signal</InputLabel>
          <Select
            value={signalId}
            label="Signal"
            onChange={(e) => setSignalId(e.target.value)}
          >
            {signals?.map((signal) => (
              <MenuItem key={signal.id} value={signal.id}>
                {signal.name} ({signal.category})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Legal Purpose</InputLabel>
          <Select
            value={legalPurposeId}
            label="Legal Purpose"
            onChange={(e) => setLegalPurposeId(e.target.value)}
          >
            {legalPurposes?.map((purpose) => (
              <MenuItem key={purpose.id} value={purpose.id}>
                {purpose.title} - {purpose.regulation}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions className="p-4">
        <Button onClick={handleClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!signalId || !legalPurposeId || isLoading}
          startIcon={isLoading && <CircularProgress size={20} />}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateDataRequestModal;