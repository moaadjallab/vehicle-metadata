import {
  Drawer,
  Typography,
  IconButton,
  Divider,
  Chip,
  Box,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import type { DataRequest } from '../types';

interface AuditPanelProps {
  open: boolean;
  onClose: () => void;
  dataRequest: DataRequest | null;
}

function AuditPanel({ open, onClose, dataRequest }: AuditPanelProps) {
  if (!dataRequest) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'APPROVED':
        return 'success';
      case 'REJECTED':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400 }} className="p-6">

        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5" className="font-bold">
            Request Details
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <Divider className="mb-4" />

        <div className="mb-4">
          <Typography variant="caption" className="text-gray-500 uppercase">
            Request ID
          </Typography>
          <Typography variant="body2" className="font-mono text-sm break-all">
            {dataRequest.id}
          </Typography>
        </div>


        <div className="mb-4">
          <Typography variant="caption" className="text-gray-500 uppercase">
            Signal
          </Typography>
          <Typography variant="body1" className="font-medium">
            {dataRequest.signalName}
          </Typography>
          <Typography variant="caption" className="text-gray-500">
            ID: {dataRequest.signalId}
          </Typography>
        </div>


        <div className="mb-4">
          <Typography variant="caption" className="text-gray-500 uppercase">
            Legal Purpose
          </Typography>
          <Typography variant="body1" className="font-medium">
            {dataRequest.legalPurposeTitle}
          </Typography>
          <Typography variant="caption" className="text-gray-500">
            ID: {dataRequest.legalPurposeId}
          </Typography>
        </div>

        <Divider className="my-4" />


        <div className="mb-4">
          <Typography variant="caption" className="text-gray-500 uppercase mb-2">
            Current Status
          </Typography>
          <div>
            <Chip
              label={dataRequest.status}
              color={getStatusColor(dataRequest.status)}
              className="mt-1"
            />
          </div>
        </div>


        <div className="mb-4">
          <Typography variant="caption" className="text-gray-500 uppercase">
            Created At
          </Typography>
          <Typography variant="body2">
            {new Date(dataRequest.createdAt).toLocaleString()}
          </Typography>
        </div>

        <div className="mb-4">
          <Typography variant="caption" className="text-gray-500 uppercase">
            Last Updated
          </Typography>
          <Typography variant="body2">
            {new Date(dataRequest.updatedAt).toLocaleString()}
          </Typography>
        </div>


        <Box className="bg-blue-50 p-3 rounded mt-6">
          <Typography variant="caption" className="text-blue-800">
            <strong>Audit Trail:</strong> This panel provides read-only access to request details for compliance tracking and EU Data Act traceability.
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}

export default AuditPanel;