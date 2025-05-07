import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Typography, Box
} from '@mui/material';
import { toast } from 'react-toastify';
import { getDocuments, downloadDocument } from '../services/api';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await getDocuments();
      setDocuments(response.data);
    } catch (error) {
      toast.error('Failed to fetch documents.');
      console.error('Fetch documents error:', error);
    }
  };

  const handleDownloadDocument = async (fileName) => {
    if (!fileName) {
      toast.error('Invalid file name.');
      return;
    }

    try {
      const response = await downloadDocument(fileName);

      const blob = new Blob([response.data], {
        type: response.headers['content-type'],
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success('Download started');
    } catch (error) {
      toast.error('Failed to download document.');
      console.error('Download error:', error);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Document Management
      </Typography>

      {documents.length === 0 ? (
        <Typography>No documents available.</Typography>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><strong>Document ID</strong></TableCell>
                <TableCell><strong>File Name</strong></TableCell>
                <TableCell><strong>User ID</strong></TableCell>
                <TableCell><strong>Download</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.documentId}>
                  <TableCell>{doc.documentId}</TableCell>
                  <TableCell>{doc.fileName}</TableCell>
                  <TableCell>{doc.userId}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleDownloadDocument(doc.fileName)}
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default DocumentManagement;
