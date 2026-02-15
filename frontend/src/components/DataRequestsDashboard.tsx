import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { Info as InfoIcon, Edit as EditIcon } from '@mui/icons-material';
import { useState } from 'react';
import {
  useGetDataRequestsQuery,
  useUpdateDataRequestStatusMutation,
} from '../features/api/apiSlice';
import type { DataRequest } from '../types';
import AuditPanel from './AuditPanel';

function DataRequestsDashboard() {
  const [selectedRequest, setSelectedRequest] = useState<DataRequest | null>(null);
  const [auditOpen, setAuditOpen] = useState(false);
  

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editingRequestId, setEditingRequestId] = useState<string | null>(null);

  const { data: dataRequests, isLoading, error } = useGetDataRequestsQuery();
  const [updateStatus] = useUpdateDataRequestStatusMutation();

  const handleOpenStatusMenu = (event: React.MouseEvent<HTMLElement>, requestId: string) => {
    setAnchorEl(event.currentTarget);
    setEditingRequestId(requestId);
  };

  const handleCloseStatusMenu = () => {
    setAnchorEl(null);
    setEditingRequestId(null);
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!editingRequestId) return;

    await updateStatus({
      id: editingRequestId,
      status: { status: newStatus as 'PENDING' | 'APPROVED' | 'REJECTED' },
    });

    handleCloseStatusMenu();
  };

  const handleOpenAudit = (request: DataRequest) => {
    setSelectedRequest(request);
    setAuditOpen(true);
  };

  const handleCloseAudit = () => {
    setAuditOpen(false);
    setSelectedRequest(null);
  };

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Alert severity="error">Failed to load data requests</Alert>;
  }

  return (
    <>
      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell className="font-bold">Signal</TableCell>
              <TableCell className="font-bold">Legal Purpose</TableCell>
              <TableCell className="font-bold">Status</TableCell>
              <TableCell className="font-bold">Created</TableCell>
              <TableCell className="font-bold">Updated</TableCell>
              <TableCell className="font-bold" align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataRequests?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" className="text-gray-500 py-8">
                  No data requests yet. Create one from the Signals tab!
                </TableCell>
              </TableRow>
            ) : (
              dataRequests?.map((request) => (
                <TableRow key={request.id} hover>
                  <TableCell className="font-medium">{request.signalName}</TableCell>
                  <TableCell>{request.legalPurposeTitle}</TableCell>
                  <TableCell>
                    <Chip 
                      label={request.status} 
                      color={getStatusColor(request.status)} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(request.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(request.updatedAt).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={(e) => handleOpenStatusMenu(e, request.id)}
                      title="Edit Status"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="info"
                      size="small"
                      onClick={() => handleOpenAudit(request)}
                      title="View Details"
                    >
                      <InfoIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseStatusMenu}
      >
        <MenuItem onClick={() => handleStatusChange('PENDING')}>
          <Chip label="PENDING" color="warning" size="small" className="mr-2" />
          Set as Pending
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('APPROVED')}>
          <Chip label="APPROVED" color="success" size="small" className="mr-2" />
          Set as Approved
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('REJECTED')}>
          <Chip label="REJECTED" color="error" size="small" className="mr-2" />
          Set as Rejected
        </MenuItem>
      </Menu>

      <AuditPanel
        open={auditOpen}
        onClose={handleCloseAudit}
        dataRequest={selectedRequest}
      />
    </>
  );
}

export default DataRequestsDashboard;