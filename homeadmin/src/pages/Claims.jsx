import React, { useEffect, useState } from 'react';
import {
  getAllClaims,
  approveClaim,
  rejectClaim,
  deleteClaim,
} from '../services/api'; 
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
  Tooltip,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx'; // To export CSV

const Claims = () => {
  const [claims, setClaims] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');

  // Fetch claims based on filter
  const fetchClaims = () => {
    getAllClaims()
      .then((response) => {
        console.log('Claims Data: ', response.data); // Log the data to verify status values
        setClaims(response.data);
      })
      .catch((error) => {
        console.error('Error fetching claims:', error);
        toast.error('Failed to fetch claims');
      });
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  // Handle filter change
  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  // Filtered claims based on selected status
  const filteredClaims = claims.filter((claim) =>
    statusFilter ? claim.status === statusFilter : true
  );

  // Handle approve
  const handleApprove = (id) => {
    approveClaim(id)
      .then(() => {
        toast.success('Claim approved');
        fetchClaims();
      })
      .catch(() => toast.error('Error approving claim'));
  };

  // Handle reject
  const handleReject = (id) => {
    const reason = prompt('Enter rejection reason:');
    if (reason) {
      rejectClaim(id, { reason })
        .then(() => {
          toast.info('Claim rejected');
          fetchClaims();
        })
        .catch(() => toast.error('Error rejecting claim'));
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this claim?')) {
      deleteClaim(id)
        .then(() => {
          toast.warn('Claim deleted');
          fetchClaims();
        })
        .catch(() => toast.error('Error deleting claim'));
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(filteredClaims);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Claims');
    XLSX.writeFile(wb, 'claims_data.xlsx');
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Claims Management
      </Typography>

      {/* Filter */}
      <Box sx={{ marginBottom: 2 }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Status Filter</InputLabel>
          <Select
            label="Status Filter"
            value={statusFilter}
            onChange={handleStatusFilterChange}
            fullWidth
          >
            <MenuItem value="">All Claims</MenuItem>
            <MenuItem value="PENDING">PENDING</MenuItem>
            <MenuItem value="APPROVED">APPROVED</MenuItem>
            <MenuItem value="REJECTED">REJECTED</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Export Button */}
      <Box sx={{ marginBottom: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={exportToCSV}
          sx={{ marginBottom: 2 }}
        >
          Export to CSV
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Claim ID</TableCell>
              <TableCell>Policy ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Incident Date</TableCell>
              <TableCell>Estimated Cost</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Submitted At</TableCell>
              <TableCell>Image</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClaims.length > 0 ? (
              filteredClaims.map((claim) => (
                <TableRow key={claim.claimId}>
                  <TableCell>{claim.claimId}</TableCell>
                  <TableCell>{claim.policyId}</TableCell>
                  <TableCell>{claim.userId}</TableCell>
                  <TableCell>{claim.incidentDate}</TableCell>
                  <TableCell>${claim.estimatedCost}</TableCell>
                  <TableCell>{claim.status}</TableCell>
                  <TableCell>{claim.description}</TableCell>
                  <TableCell>{claim.submittedAt}</TableCell>
                  <TableCell>
                    {claim.imageUrl ? (
                      <Tooltip title="View image">
                        <Avatar
                          variant="rounded"
                          src={claim.imageUrl}
                          sx={{ width: 56, height: 56 }}
                          alt="Claim Image"
                        />
                      </Tooltip>
                    ) : (
                      'No image'
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {/* Conditionally render Approve/Reject buttons */}
                    {claim.status !== 'APPROVED' && claim.status !== 'REJECTED' && (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => handleApprove(claim.claimId)}
                          sx={{ mr: 1 }}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          color="warning"
                          size="small"
                          onClick={() => handleReject(claim.claimId)}
                          sx={{ mr: 1 }}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(claim.claimId)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No claims available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Claims;
