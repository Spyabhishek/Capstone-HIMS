import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  Snackbar
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
    padding: theme.spacing(1),
    maxWidth: "500px",
    width: "100%"
  }
}));

const GradientButton = styled(Button)(({ theme }) => ({
  padding: "12px 28px",
  borderRadius: "8px",
  fontWeight: "600",
  textTransform: "none",
  boxShadow: "0 4px 14px rgba(25, 118, 210, 0.3)",
  transition: "all 0.3s ease",
  background: "linear-gradient(45deg, #1976d2 0%, #42a5f5 100%)",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 8px 20px rgba(25, 118, 210, 0.4)",
    background: "linear-gradient(45deg, #1565c0 0%, #1976d2 100%)",
  },
}));

const DateInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": {
      borderColor: "rgba(25, 118, 210, 0.2)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(25, 118, 210, 0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2",
    },
  },
  "& .MuiInputAdornment-root": {
    color: "#1976d2",
  }
}));

const PropertySelect = styled(FormControl)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": {
      borderColor: "rgba(25, 118, 210, 0.2)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(25, 118, 210, 0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2",
    },
  }
}));

const ApplyNowPopup = ({ open, handleClose, policyId }) => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [basePremium, setBasePremium] = useState(0);
  const [premium, setPremium] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [userId, setUserId] = useState(null);

  // Calculate adjusted premium based on duration
  const calculateAdjustedPremium = () => {
    if (!startDate || !endDate) return basePremium;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Calculate difference in months
    let months = (end.getFullYear() - start.getFullYear()) * 12;
    months += end.getMonth() - start.getMonth();
    
    // If there are any additional days, count as a full month
    if (end.getDate() > start.getDate()) {
      months += 1;
    }
    
    // Ensure minimum of 1 month
    const durationMonths = Math.max(1, months);
    return basePremium * durationMonths;
  };

  // Debug logging for user authentication
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    console.log("Auth debug - Token exists:", !!token);
    console.log("Auth debug - UserId:", userId);
    
    if (userId) {
      setUserId(userId);
    }
  }, []);

  // Set base premium based on policyId
  useEffect(() => {
    const policyIdNum = parseInt(policyId);
    console.log("PolicyId received:", policyIdNum);
    
    let premiumValue = 0;
    if (policyIdNum === 101) {
      premiumValue = 3500;
    } else if (policyIdNum === 102) {
      premiumValue = 6200;
    } else if (policyIdNum === 103) {
      premiumValue = 2700;
    } else if (policyIdNum === 104) {
      premiumValue = 7500;
    }
    
    setBasePremium(premiumValue);
    setPremium(premiumValue); // Initialize premium with base value
  }, [policyId]);

  // Calculate and update premium whenever dates change
  useEffect(() => {
    if (startDate && endDate) {
      const calculatedPremium = calculateAdjustedPremium();
      if (calculatedPremium !== premium) {
        setPremium(calculatedPremium);
      }
    }
  }, [startDate, endDate, basePremium]);

  const showSnackbar = (message, severity = "info") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
    
    if (toast && typeof toast[severity] === 'function') {
      toast[severity](message);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Fetch user properties with improved error handling
  const fetchUserProperties = async () => {
    setIsLoading(true);
    setFetchError("");
    
    try {
      const token = localStorage.getItem("token");
      let storedUserId = localStorage.getItem("userId");
      
      if (!token) {
        throw new Error("Authentication required. Please login again.");
      }
      
      if (!storedUserId) {
        console.error("UserId missing from localStorage");
        try {
          const parts = token.split('.');
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1]));
            if (payload && payload.sub) {
              storedUserId = payload.sub;
              console.log("Extracted userId from token:", storedUserId);
              localStorage.setItem("userId", storedUserId);
              setUserId(storedUserId);
            }
          }
        } catch (tokenError) {
          console.error("Failed to extract userId from token:", tokenError);
        }
        
        if (!storedUserId) {
          throw new Error("User ID is missing. Please login again.");
        }
      }
      
      let propertiesData = [];
      
      try {
        const response = await axios.get(`http://localhost:8085/api/properties/my`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data && Array.isArray(response.data)) {
          propertiesData = response.data;
          console.log("Properties fetched successfully:", propertiesData.length);
        }
      } catch (firstError) {
        console.log("First API attempt failed:", firstError);
        
        try {
          const response = await axios.get(`http://localhost:8085/api/properties/user/${storedUserId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          if (response.data && Array.isArray(response.data)) {
            propertiesData = response.data;
            console.log("Properties fetched with userId:", propertiesData.length);
          }
        } catch (secondError) {
          console.log("Second API attempt failed:", secondError);
          
          const mockProperties = [];
          for (let i = 1; i <= 10; i++) {
            try {
              const propertyResponse = await axios.get(`http://localhost:8085/api/properties/${i}`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              
              if (propertyResponse.data) {
                if (
                  (propertyResponse.data.user && propertyResponse.data.user.id == storedUserId) ||
                  (propertyResponse.data.userId == storedUserId)
                ) {
                  mockProperties.push(propertyResponse.data);
                }
              }
            } catch (singleError) {
            }
          }
          
          if (mockProperties.length > 0) {
            propertiesData = mockProperties;
            console.log("Properties fetched individually:", propertiesData.length);
          }
        }
      }
      
      if (propertiesData.length === 0) {
        setFetchError("You don't have any properties. Please add a property first.");
      } else {
        setProperties(propertiesData);
        const firstPropertyId = propertiesData[0].id || 
                            propertiesData[0].propertyId || 
                            propertiesData[0].property_id;
        setSelectedProperty(String(firstPropertyId));
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      
      let errorMessage = error.message || "Failed to load properties";
      if (error.response) {
        errorMessage = `Server error (${error.response.status}): ${error.response.data?.message || error.response.data || "Unknown error"}`;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      }
      
      setFetchError(errorMessage);
      showSnackbar(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchUserProperties();
    }
  }, [open]);

  const validateForm = () => {
    if (!selectedProperty) {
      setError("Please select a property");
      return false;
    }
    
    if (!startDate || !endDate) {
      setError("Please select both start and end dates");
      return false;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (start >= end) {
      setError("End date must be after start date");
      return false;
    }

    if (start < today) {
      setError("Start date cannot be in the past");
      return false;
    }

    if (premium <= 0) {
      setError("Invalid premium amount for this policy");
      return false;
    }

    if (!userId) {
      setError("User ID is missing. Please login again.");
      return false;
    }

    setError("");
    return true;
  };

  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const updatePaymentStatus = async (razorpayOrderId, status, additionalDetails = {}) => {
    try {
      console.log("Updating payment status:", { razorpayOrderId, status, additionalDetails });
      
      const response = await axios.post('http://localhost:8085/api/payments/update-status', {
        razorpayOrderId,
        status,
        ...additionalDetails
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      console.log("Payment status update response:", response.data);
      return response.data;
    } catch (err) {
      console.error('Failed to update status:', err);
      throw err;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      showSnackbar("Please fix the form errors before submitting", "error");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem("token");
      const storedUserId = userId || localStorage.getItem("userId");
      
      if (!token) {
        throw new Error("Authentication required. Please login again.");
      }
      
      if (!storedUserId) {
        throw new Error("User ID is missing. Please login again.");
      }
      
      const policyIdNum = parseInt(policyId);
      const propertyIdNum = parseInt(selectedProperty);
      const userIdNum = parseInt(storedUserId);
      
      // Calculate final premium based on duration
      const calculatedPremium = calculateAdjustedPremium();
      console.log(`Premium adjustment: ${basePremium} x ${calculatedPremium/basePremium} months = ${calculatedPremium}`);
      
      let policyType = "";
      if (policyIdNum === 101) {
        policyType = "Standard Home Coverage";
      } else if (policyIdNum === 102) {
        policyType = "Premium Home Shield";
      } else if (policyIdNum === 103) {
        policyType = "Essential Condo Cover";
      } else if (policyIdNum === 104) {
        policyType = "Natural Calamity Shield";
      } else {
        policyType = "STANDARD";
      }
      
      const payload = {
        propertyId: propertyIdNum,
        userId: userIdNum,
        user_id: userIdNum,
        user: {
          id: userIdNum,
          userId: userIdNum
        },
        startDate: startDate,
        endDate: endDate,
        premium: calculatedPremium,
        type: policyType,
        coverageDetails: policyType === "Standard Home Coverage" ? 
          "Covers fire, theft, structural damage, water damage, and personal belongings" :
        policyType === "Premium Home Shield" ? 
          "Includes fire, theft, flood, structural and appliance cover, plus home services" :
        policyType === "Essential Condo Cover" ? 
          "Interior and personal property cover for condos; includes water and liability" :
        policyType === "Natural Calamity Shield" ?
          "Full natural disaster cover: earthquake, flood, storm, debris, relocation help" :
          "Coverage details not available",
        exclusions: policyType === "Standard Home Coverage" ? 
          "War, intentional damage, wear and tear, pests, and uncovered disasters" :
        policyType === "Premium Home Shield" ? 
          "War, intentional damage, undeclared valuables, pre-existing issues" :
        policyType === "Essential Condo Cover" ? 
          "Exterior damage, common areas, quakes/floods without riders, assessments" :
        policyType === "Natural Calamity Shield" ?
          "War, neglect, government seizure, gradual earth movement" :
          "Exclusions not available"
      };

      // First submit the policy
      const response = await axios.post(
        "http://localhost:8085/api/policies/submit", 
        payload, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "X-User-ID": storedUserId
          }
        }
      );

      // Load Razorpay script
      const res = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!res) {
        throw new Error('Failed to load Razorpay SDK');
      }

      // Create payment order with the calculated premium
      console.log("Creating payment with:", {
        policyId: policyIdNum,
        userId: storedUserId,
        amount: calculatedPremium
      });

      const paymentResponse = await axios.post('http://localhost:8085/api/payments/create', {
        policyId: policyIdNum,
        userId: storedUserId,
        amount: calculatedPremium,
        paymentDate: new Date().toISOString(),
        status: 'Pending',
        type: policyType
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const { razorpayOrderId, razorpayKey, amountPaid } = paymentResponse.data;

      // Configure Razorpay options
      const options = {
        key: razorpayKey,
        amount: amountPaid * 100, // Convert to paise
        currency: 'INR',
        name: 'Insurance Payment',
        description: `Payment for ${policyType}`,
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            console.log("Payment response:", response);
            
            const verifyResponse = await axios.post('http://localhost:8085/api/payments/verify', {
              razorpayOrderId: razorpayOrderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              status: 'Success',
              paymentDate: new Date().toISOString()
            }, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
              }
            });

            if (verifyResponse.data.verified) {
              // Update payment status with more details
              await updatePaymentStatus(razorpayOrderId, 'Success', {
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                paymentDate: new Date().toISOString()
              });
              showSnackbar("Payment Successful!", "success");
              handleClose();
              // Redirect to profile page with policies tab active
              navigate("/profile", { state: { activeTab: "policies" } });
            } else {
              await updatePaymentStatus(razorpayOrderId, 'Failed', {
                paymentDate: new Date().toISOString()
              });
              showSnackbar("Payment verification failed", "error");
            }
          } catch (error) {
            console.error('Verification error:', error);
            await updatePaymentStatus(razorpayOrderId, 'Failed', {
              paymentDate: new Date().toISOString()
            });
            showSnackbar("Payment failed", "error");
          }
        },
        prefill: {
          name: localStorage.getItem('userName') || 'Test User',
          email: localStorage.getItem('userEmail') || 'test@example.com',
        },
        theme: {
          color: '#1976d2',
        },
        modal: {
          ondismiss: async function () {
            await updatePaymentStatus(razorpayOrderId, 'Failed', {
              paymentDate: new Date().toISOString()
            });
            showSnackbar("Payment was cancelled", "error");
          }
        }
      };

      // Open Razorpay payment window
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Application submission failed:", error);
      
      let errorMessage = error.message || "Failed to submit your application";
      if (error.response) {
        console.error("Error response:", error.response);
        console.error("Error response data:", error.response.data);
        errorMessage = `Error (${error.response.status}): ${error.response.data?.message || 
          (typeof error.response.data === 'string' ? error.response.data : JSON.stringify(error.response.data))}`;
      } else if (error.request) {
        console.error("No response received:", error.request);
        errorMessage = "No response from server. The server may be down or your connection lost.";
      }
      
      setError(errorMessage);
      showSnackbar(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPropertyAddressById = (propertyId) => {
    if (!propertyId || !properties.length) return "Unknown property";
    
    const property = properties.find(p => {
      const propId = p.id || p.propertyId || p.property_id;
      return propId == propertyId;
    });
    
    if (!property) return "Unknown property";
    
    return `${property.address || ""}${property.city ? `, ${property.city}` : ""}${property.zipcode ? ` ${property.zipcode}` : ""}`;
  };

  const handleAddProperty = () => {
    handleClose();
    navigate("/add-property");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <>
      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="apply-now-dialog-title"
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, pt: 2 }}>
          <DialogTitle id="apply-now-dialog-title" sx={{ p: 0, fontWeight: "bold" }}>
            Apply for Home Insurance
          </DialogTitle>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        
        <DialogContent sx={{ px: 3, pt: 2 }}>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          ) : fetchError ? (
            <Box>
              <Typography variant="body1" color="error" sx={{ my: 2 }}>
                {fetchError}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 2 }}>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  onClick={fetchUserProperties}
                  startIcon={<HomeIcon />}
                >
                  Retry Loading Properties
                </Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleAddProperty}
                  startIcon={<AddCircleOutlineIcon />}
                >
                  Add New Property
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
                Please select the property you want to insure and your preferred coverage period.
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "medium" }}>
                  Select Property
                </Typography>
                <PropertySelect fullWidth error={!!error && !selectedProperty}>
                  <InputLabel id="property-select-label">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <HomeIcon fontSize="small" sx={{ mr: 1 }} />
                      Your Property
                    </Box>
                  </InputLabel>
                  <Select
                    labelId="property-select-label"
                    value={selectedProperty}
                    onChange={(e) => setSelectedProperty(e.target.value)}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <HomeIcon fontSize="small" sx={{ mr: 1 }} />
                        Your Property
                      </Box>
                    }
                  >
                    {properties.map((property) => {
                      const propId = property.id || property.propertyId || property.property_id;
                      const address = property.address || "Unknown address";
                      const city = property.city || "";
                      const zipcode = property.zipcode || property.zip || "";
                      
                      return (
                        <MenuItem key={propId} value={propId.toString()}>
                          {address}
                          {city ? `, ${city}` : ""}
                          {zipcode ? ` ${zipcode}` : ""}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {!!error && !selectedProperty && (
                    <FormHelperText error>Please select a property</FormHelperText>
                  )}
                </PropertySelect>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "medium" }}>
                  Start Date
                </Typography>
                <DateInput
                  fullWidth
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  error={!!error && !startDate}
                  helperText={!!error && !startDate ? "Start date is required" : ""}
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                        <CalendarTodayIcon fontSize="small" />
                      </Box>
                    ),
                  }}
                />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "medium" }}>
                  End Date
                </Typography>
                <DateInput
                  fullWidth
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  error={!!error && !endDate}
                  helperText={!!error && !endDate ? "End date is required" : ""}
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                        <CalendarTodayIcon fontSize="small" />
                      </Box>
                    ),
                  }}
                />
              </Box>
              
              <Box sx={{ mb: 3, p: 2, bgcolor: "rgba(25, 118, 210, 0.08)", borderRadius: "8px" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "medium", mb: 1 }}>
                  Policy Premium:
                </Typography>
                <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: "bold" }}>
                  {formatCurrency(premium)}
                </Typography>
                {startDate && endDate && (
                  <Typography variant="caption" sx={{ display: 'block', color: "text.secondary" }}>
                    {`Calculated for ${calculateAdjustedPremium() / basePremium} month(s)`}
                  </Typography>
                )}
                <Typography variant="caption" sx={{ display: 'block', color: "text.secondary" }}>
                  Policy Number: {policyId}
                </Typography>
                {userId && (
                  <Typography variant="caption" sx={{ display: 'block', color: "text.secondary" }}>
                    User ID: {userId}
                  </Typography>
                )}
              </Box>

              {selectedProperty && (
                <Box sx={{ mb: 3, p: 2, bgcolor: "rgba(25, 118, 210, 0.08)", borderRadius: "8px" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: "medium", mb: 1 }}>
                    Selected Property:
                  </Typography>
                  <Typography variant="body2">
                    {getPropertyAddressById(selectedProperty)}
                  </Typography>
                </Box>
              )}
              
              {error && error !== "Please select a property" && error.indexOf("date") === -1 && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
            </>
          )}
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3, justifyContent: "space-between" }}>
          <Button 
            onClick={handleClose} 
            variant="outlined" 
            sx={{ 
              borderColor: "#1976d2", 
              color: "#1976d2",
              "&:hover": {
                borderColor: "#0d47a1",
                backgroundColor: "rgba(25, 118, 210, 0.04)"
              }
            }}
          >
            Cancel
          </Button>
          <GradientButton 
            onClick={handleSubmit} 
            variant="contained" 
            disabled={isSubmitting || isLoading || !!fetchError}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Proceed to Payment"
            )}
          </GradientButton>
        </DialogActions>
      </StyledDialog>
      
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ApplyNowPopup;