// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Grid,
//   Typography,
//   Stack,
//   TextField,
//   IconButton,
// } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import ContactSupportIcon from '@mui/icons-material/ContactSupport';
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import ContactPopup from '../layout/ContactPopup';
// import SampleFooter from '../auth/SampleFooter';

// const ClaimStatusPage = () => {
//   const [contactPopupOpen, setContactPopupOpen] = useState(false);
//   const [fetchedDocuments, setFetchedDocuments] = useState([]);
//   const [claimId, setClaimId] = useState('12345');
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [userEmail, setUserEmail] = useState('');
//   const fileInputRef = useRef();

//   useEffect(() => {
//     if (claimId) {
//       handleFetchDocuments();
//     }
//   }, [claimId]);

//   useEffect(() => {
//     try {
//       const token = localStorage.getItem('token');
//       if (token) {
//         try {
//           const payload = JSON.parse(atob(token.split('.')[1]));
//           if (payload && payload.sub) {
//             setUserEmail(payload.sub);
//           }
//         } catch (tokenError) {}
//       }
//     } catch (error) {}
//   }, []);

//   const handleContactSupportClick = () => {
//     setContactPopupOpen(true);
//   };

//   const handleCloseContactPopup = () => {
//     setContactPopupOpen(false);
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//     }
//   };

//   const handleUpload = async () => {
//     console.log('Current userEmail:', userEmail);
//     console.log('Selected file:', selectedFile);
//     console.log('Claim ID:', claimId);

//     if (!userEmail) {
//       toast.error('Please log in to upload documents.');
//       return;
//     }

//     if (selectedFile && claimId) {
//       const formData = new FormData();
//       formData.append('email', userEmail);
//       formData.append('claimId', claimId);
//       formData.append('files', selectedFile);

//       try {
//         const response = await axios.post('http://localhost:8085/api/documents/upload', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           },
//         });

//         if (response.data.includes('Error')) {
//           toast.error(response.data);
//         } else {
//           toast.success('Document uploaded successfully!');
//           setSelectedFile(null);
//           fileInputRef.current.value = '';
//           handleFetchDocuments();
//         }
//       } catch (error) {
//         console.error('Error uploading document:', error);
//         toast.error(error.response?.data || 'Error uploading document!');
//       }
//     } else {
//       toast.warning('Please select a file to upload.');
//     }
//   };

//   const handleFetchDocuments = async () => {
//     if (claimId) {
//       try {
//         const response = await axios.get(`http://localhost:8085/api/documents/claim/${claimId}`, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         console.log('Fetched documents response:', response.data);
//         setFetchedDocuments(response.data);
//       } catch (error) {
//         console.error('Error fetching documents:', error);
//         toast.error('Error fetching documents!');
//       }
//     } else {
//       toast.warning('Please enter a Claim ID to fetch documents.');
//     }
//   };

//   return (
//     <Box p={3} mt={4}>
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//       <Card elevation={3}>
//         <CardContent>
//           <Grid container justifyContent="space-between" alignItems="center">
//             <Typography variant="h6" fontWeight="bold">
//               Claim ID: {claimId}
//             </Typography>
//             <Button variant="outlined" color="info" size="small">
//               Under Review
//             </Button>
//           </Grid>

//           <Typography variant="h5" mt={2} fontWeight="bold">
//             Property Damage Claim
//           </Typography>

//           <Grid container spacing={3} mt={2}>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="body2" color="text.secondary">Property Address</Typography>
//               <Typography>123 Insurance Street, Safety City, ST 12345</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="body2" color="text.secondary">Date Submitted</Typography>
//               <Typography>March 15, 2025</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="body2" color="text.secondary">Estimated Resolution</Typography>
//               <Typography>April 5, 2025</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="body2" color="text.secondary">Claim Type</Typography>
//               <Typography fontWeight="bold">Property Damage - Water Leak</Typography>
//             </Grid>
//           </Grid>

//           <Box mt={4}>
//             <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
//               <Button
//                 variant="contained"
//                 startIcon={<ContactSupportIcon />}
//                 onClick={handleContactSupportClick}
//               >
//                 Contact Support
//               </Button>
//               <Button
//                 variant="outlined"
//                 component="label"
//                 startIcon={<InsertDriveFileIcon />}
//               >
//                 Choose File
//                 <input
//                   type="file"
//                   hidden
//                   ref={fileInputRef}
//                   onChange={handleFileChange}
//                 />
//               </Button>

//               <Button
//                 variant="contained"
//                 onClick={handleUpload}
//                 startIcon={<CloudUploadIcon />}
//               >
//                 Upload
//               </Button>

//               {selectedFile && (
//                 <Typography variant="body2" color="text.secondary">
//                   Selected: {selectedFile.name}
//                 </Typography>
//               )}
//             </Stack>
//           </Box>
//         </CardContent>
//       </Card>

//       <Card elevation={2} sx={{ mt: 4 }}>
//         <CardContent>
//           <Grid container justifyContent="space-between" alignItems="center" mb={2}>
//             <Typography variant="h6">Uploaded Documents</Typography>
//           </Grid>

//           {fetchedDocuments.length === 0 ? (
//             <Typography color="text.secondary">No documents found for this claim.</Typography>
//           ) : (
//             fetchedDocuments.map((doc, index) => (
//               <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//                 <Stack direction="row" spacing={1} alignItems="center">
//                   <InsertDriveFileIcon />
//                   <Typography>{doc.fileName || doc.name || 'Unnamed Document'}</Typography>
//                 </Stack>
//               </Box>
//             ))
//           )}
//         </CardContent>
//       </Card>

//       <ContactPopup open={contactPopupOpen} onClose={handleCloseContactPopup} />
//       <SampleFooter />
//     </Box>
//   );
// };

// export default ClaimStatusPage;
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  Stack,
  TextField,
  IconButton,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ContactPopup from '../layout/ContactPopup';
import SearchIcon from '@mui/icons-material/Search';
import SampleFooter from '../auth/SampleFooter';

const ClaimStatusPage = () => {
  const [contactPopupOpen, setContactPopupOpen] = useState(false);
  const [fetchedDocuments, setFetchedDocuments] = useState([]);
  const [claimId, setClaimId] = useState('12345');
  const [selectedFile, setSelectedFile] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const fileInputRef = useRef();

  useEffect(() => {
    // Fetch documents when component mounts
    if (claimId) {
      handleFetchDocuments();
    }
  }, [claimId]); // Add claimId as dependency

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Decode the JWT token
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload && payload.sub) {

            setUserEmail(payload.sub);
          }
        } catch (tokenError) {
        }
      } else {
      }
    } catch (error) {
    }
  }, []);

  const handleContactSupportClick = () => {
    setContactPopupOpen(true);
  };

  const handleCloseContactPopup = () => {
    setContactPopupOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    console.log('Current userEmail:', userEmail);
    console.log('Selected file:', selectedFile);
    console.log('Claim ID:', claimId);

    if (!userEmail) {
      toast.error('Please log in to upload documents.');
      return;
    }

    if (selectedFile && claimId) {
      const formData = new FormData();
      formData.append('email', userEmail);
      formData.append('claimId', claimId);
      formData.append('files', selectedFile);

      try {
        const response = await axios.post('http://localhost:8085/api/documents/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        
        if (response.data.includes('Error')) {
          toast.error(response.data);
        } else {
          toast.success('Document uploaded successfully!');
          setSelectedFile(null);
          fileInputRef.current.value = ''; // reset file input
          // Automatically fetch updated documents list
          handleFetchDocuments();
        }
      } catch (error) {
        console.error('Error uploading document:', error);
        toast.error(error.response?.data || 'Error uploading document!');
      }
    } else {
      toast.warning('Please select a file to upload.');
    }
  };

  const handleFetchDocuments = async () => {
    if (claimId) {
      try {
        const response = await axios.get(`http://localhost:8085/api/documents/claim/${claimId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Fetched documents response:', response.data);
        setFetchedDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
        toast.error('Error fetching documents!');
      }
    } else {
      toast.warning('Please enter a Claim ID to fetch documents.');
    }
  };

  return (
    <Box p={3} mt={4}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Claim Info */}
      <Card elevation={3}>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="bold">
              Claim ID: {claimId}
            </Typography>
            <Button variant="outlined" color="info" size="small">
              Under Review
            </Button>
          </Grid>

          <Typography variant="h5" mt={2} fontWeight="bold">
            Property Damage Claim
          </Typography>

          <Box mt={4} mb={3}>
            <LinearProgress variant="determinate" value={33} sx={{ height: 10, borderRadius: 5 }} />
            <Stack direction="row" justifyContent="space-between" mt={1}>
              <Typography fontSize="small">Submitted</Typography>
              <Typography fontSize="small">Under Review</Typography>
              <Typography fontSize="small" color="text.secondary">Processing</Typography>
              <Typography fontSize="small" color="text.secondary">Complete</Typography>
            </Stack>
          </Box>

          <Grid container spacing={3} mt={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Property Address</Typography>
              <Typography>123 Insurance Street, Safety City, ST 12345</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Date Submitted</Typography>
              <Typography>March 15, 2025</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Estimated Resolution</Typography>
              <Typography>April 5, 2025</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Claim Type</Typography>
              <Typography fontWeight="bold">Property Damage - Water Leak</Typography>
            </Grid>
          </Grid>

          <Box mt={4}>
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
              <Button
                variant="contained"
                startIcon={<ContactSupportIcon />}
                onClick={handleContactSupportClick}
              >
                Contact Support
              </Button>
              <Button
                variant="outlined"
                component="label"
                startIcon={<InsertDriveFileIcon />}
              >
                Choose File
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </Button>

              <Button
                variant="contained"
                onClick={handleUpload}
                startIcon={<CloudUploadIcon />}
              >
                Upload
              </Button>

              {selectedFile && (
                <Typography variant="body2" color="text.secondary">
                  Selected: {selectedFile.name}
                </Typography>
              )}
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {/* Fetched Documents */}
      <Card elevation={2} sx={{ mt: 4 }}>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Uploaded Documents</Typography>
          </Grid>

          {fetchedDocuments.length === 0 ? (
            <Typography color="text.secondary">No documents found for this claim.</Typography>
          ) : (
            fetchedDocuments.map((doc, index) => (
              <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <InsertDriveFileIcon />
                  <Typography>{doc.fileName || doc.name || 'Unnamed Document'}</Typography>
                </Stack>
              </Box>
            ))
          )}
        </CardContent>
      </Card>

      {/* Contact Popup */}
      <ContactPopup open={contactPopupOpen} onClose={handleCloseContactPopup} />
      <SampleFooter />
    </Box>
  );
};

export default ClaimStatusPage;
