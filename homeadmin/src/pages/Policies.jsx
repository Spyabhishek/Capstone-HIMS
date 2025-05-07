import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Tooltip,
} from "@mui/material";
import { toast } from "react-toastify";
import {
  getAdminPolicies,
  approvePolicy,
  rejectPolicy,
  deleteAdminPolicy,
} from "../services/api";

const Policies = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPolicies = async () => {
    try {
      const response = await getAdminPolicies();
      setPolicies(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching policies:", err);
      setError("Failed to load policies");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approvePolicy(id);
      toast.success("Policy approved");
      fetchPolicies();
    } catch (error) {
      toast.error("Approval failed");
    }
  };

  const handleReject = async (id) => {
    const reason = prompt("Enter rejection reason:");
    if (!reason) return;
    try {
      await rejectPolicy(id, reason);
      toast.success("Policy rejected");
      fetchPolicies();
    } catch (error) {
      toast.error("Rejection failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this policy?")) return;
    try {
      await deleteAdminPolicy(id);
      toast.success("Policy deleted");
      fetchPolicies();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        All Policies
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="policies table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Policy ID</strong></TableCell>
              <TableCell><strong>Policy Number</strong></TableCell>
              <TableCell><strong>User</strong></TableCell>
              <TableCell><strong>Property Address</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Premium</strong></TableCell>
              <TableCell><strong>Start Date</strong></TableCell>
              <TableCell><strong>End Date</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {policies.map((policy) => (
              <TableRow key={policy.policyId}>
                <TableCell>{policy.policyId}</TableCell>
                <TableCell>{policy.policyNumber}</TableCell>
                <TableCell>{policy.userName}</TableCell>
                <TableCell>{policy.propertyAddress || "N/A"}</TableCell>
                <TableCell>{policy.status}</TableCell>
                <TableCell>${policy.premium}</TableCell>
                <TableCell>{policy.startDate || "N/A"}</TableCell>
                <TableCell>{policy.endDate || "N/A"}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    {policy.status === "PENDING" && (
                      <>
                        <Tooltip title="Approve Policy">
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => handleApprove(policy.policyId)}
                          >
                            Approve
                          </Button>
                        </Tooltip>
                        <Tooltip title="Reject Policy">
                          <Button
                            variant="contained"
                            color="warning"
                            size="small"
                            onClick={() => handleReject(policy.policyId)}
                          >
                            Reject
                          </Button>
                        </Tooltip>
                      </>
                    )}
                    <Tooltip title="Delete Policy">
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(policy.policyId)}
                      >
                        Delete
                      </Button>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Policies;
