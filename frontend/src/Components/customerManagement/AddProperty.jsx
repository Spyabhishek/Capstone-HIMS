import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Grid,
  Paper,
  Divider,
  useTheme,
  Card,
  CardContent,
  Container,
  Stepper,
  Step,
  StepLabel,
  Alert,
  IconButton,
  Tooltip,
  InputAdornment,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import HomeIcon from "@mui/icons-material/Home";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import ImageIcon from "@mui/icons-material/Image";
import StraightenIcon from "@mui/icons-material/Straighten";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import BedIcon from "@mui/icons-material/Bed";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BadgeIcon from "@mui/icons-material/Badge";
import axios from "axios";
import SampleFooter from "../auth/SampleFooter";

const propertyTypes = [
  "Apartment",
  "Detached House",
  "Semi-Detached",
  "Townhouse",
  "Condo",
  "Bungalow",
];

const MAX_LENGTH = 250;

const AddProperty = () => {
  const theme = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [previewUrl, setPreviewUrl] = useState("");
  
  // Calculate max date (today) for date built field
  const today = new Date();
  const maxDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    getValues,
    watch,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      type: "Detached House",
      rooms: "",
      address: "",
      city: "",
      zip: "",
      size: "",
      value: "",
      builtDate: "",
      municipalityRegistrationNumber: "",
      imageUrl: ""
    },
  });
  
  // Watch for changes to the imageUrl field
  const watchImageUrl = watch("imageUrl");
  React.useEffect(() => {
    if (watchImageUrl) {
      setPreviewUrl(watchImageUrl);
    }
  }, [watchImageUrl]);

  const steps = [
    { label: "Location", fields: ["address", "city", "zip"] },
    { label: "Property Details", fields: ["type", "size", "rooms", "value", "builtDate", "municipalityRegistrationNumber"] },
    { label: "Image", fields: ["imageUrl"] },
  ];

  const handleNext = async () => {
    const currentStepFields = steps[activeStep].fields;
    const isStepValid = await trigger(currentStepFields);
    
    if (isStepValid) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const onSubmit = async (data) => {
    // Additional validation for date
    const selectedDate = new Date(data.builtDate);
    if (selectedDate > today) {
      toast.error("Date built cannot be in the future");
      setIsSubmitting(false);
      return;
    }
    
    setIsSubmitting(true);
    setServerError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required. Please login again.");
        setIsSubmitting(false);
        return;
      }

      const propertyData = {
        address: data.address,
        city: data.city,
        zipcode: data.zip,
        propertySize: parseFloat(data.size),
        propertyValue: parseFloat(data.value),
        type: data.type,
        numberOfRooms: parseInt(data.rooms, 10),
        imageUrl: data.imageUrl,
        builtDate: data.builtDate,
        municipalityRegistrationNumber: data.municipalityRegistrationNumber,
      };

      const response = await axios.post(
        "http://localhost:8085/api/properties",
        propertyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Property added successfully!");
      reset({ type: "Detached House" });
      setActiveStep(0);
    } catch (err) {
      let errorMessage = "Failed to add property";

      if (err.response) {
        const status = err.response.status;
        const responseData = err.response.data;

        if (typeof responseData === "string") {
          if (responseData.toLowerCase().includes("municipality registration number and address do not match")) {
            errorMessage =
              "The provided municipality registration number does not match the property address.";
          } else {
            errorMessage = `Server error (${status}): ${responseData}`;
          }
        } else if (responseData?.message) {
          const backendMessage = responseData.message.toLowerCase();
          if (backendMessage.includes("municipality registration number and address do not match")) {
            errorMessage =
              "Invalid municipality registration number for the given address.";
          } else {
            errorMessage = `Error (${status}): ${responseData.message}`;
          }
        } else {
          errorMessage = `Server error (${status})`;
        }
      } else if (err.request) {
        errorMessage = "No response from server. Please check your network.";
      } else {
        errorMessage = `Error: ${err.message}`;
      }

      setServerError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Typography variant="h6" fontWeight={600} mb={3} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon color="primary" /> Location Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Property Address"
                  fullWidth
                  variant="outlined"
                  placeholder="Enter complete street address"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    autoComplete: "off"
                  }}
                  inputProps={{ maxLength: MAX_LENGTH }}
                  {...register("address", {
                    required: "Address is required",
                    maxLength: {
                      value: MAX_LENGTH,
                      message: `Address must be less than ${MAX_LENGTH} characters`,
                    },
                    onChange: (e) => {
                      setValue("address", e.target.value);
                      return e.target.value;
                    }
                  })}
                  value={watch("address") || ""}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="City"
                  fullWidth
                  variant="outlined"
                  placeholder="City name"
                  inputProps={{ maxLength: MAX_LENGTH }}
                  {...register("city", {
                    required: "City is required",
                    maxLength: {
                      value: MAX_LENGTH,
                      message: `City must be less than ${MAX_LENGTH} characters`,
                    },
                    onChange: (e) => {
                      setValue("city", e.target.value);
                      return e.target.value;
                    }
                  })}
                  value={watch("city") || ""}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Zip Code"
                  fullWidth
                  variant="outlined"
                  placeholder="Enter postal/zip code"
                  inputProps={{ maxLength: MAX_LENGTH }}
                  {...register("zip", {
                    required: "Zip code is required",
                    maxLength: {
                      value: MAX_LENGTH,
                      message: `Zip code must be less than ${MAX_LENGTH} characters`,
                    },
                    onChange: (e) => {
                      setValue("zip", e.target.value);
                      return e.target.value;
                    }
                  })}
                  value={watch("zip") || ""}
                  error={!!errors.zip}
                  helperText={errors.zip?.message}
                  autoComplete="off"
                />
              </Grid>
            </Grid>
          </>
        );
      case 1:
        return (
          <>
            <Typography variant="h6" fontWeight={600} mb={3} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <InfoIcon color="primary" /> Property Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  label="Property Type"
                  fullWidth
                  variant="outlined"
                  defaultValue="Detached House"
                  {...register("type", { 
                    required: "Type is required",
                    onChange: (e) => {
                      setValue("type", e.target.value);
                      return e.target.value;
                    }
                  })}
                  value={watch("type") || "Detached House"}
                  error={!!errors.type}
                  helperText={errors.type?.message}
                  autoComplete="off"
                >
                  {propertyTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Property Size"
                  type="number"
                  fullWidth
                  variant="outlined"
                  placeholder="Property area in sq ft"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <StraightenIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: <InputAdornment position="end">sq ft</InputAdornment>,
                  }}
                  inputProps={{ min: 0, step: 0.01 }}
                  {...register("size", { 
                    required: "Size is required", 
                    min: 0,
                    onChange: (e) => {
                      setValue("size", e.target.value);
                      return e.target.value;
                    }
                  })}
                  value={watch("size") || ""}
                  error={!!errors.size}
                  helperText={errors.size?.message}
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Number of Rooms"
                  type="number"
                  fullWidth
                  variant="outlined"
                  placeholder="Total rooms"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ min: 0, step: 1 }}
                  {...register("rooms", { 
                    required: "Rooms required", 
                    min: 0,
                    valueAsNumber: true,  // This ensures the value is treated as a number
                    // Force manual setting of this field
                    onChange: (e) => {
                      const value = e.target.value;
                      setValue("rooms", value ? parseInt(value, 10) : "");
                      return value;
                    }
                  })}
                  // Override the default value
                  value={watch("rooms") || ""}
                  error={!!errors.rooms}
                  helperText={errors.rooms?.message}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Estimated Value"
                  type="number"
                  fullWidth
                  variant="outlined"
                  placeholder="Value in ₹"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CurrencyRupeeIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: <InputAdornment position="end">INR</InputAdornment>,
                  }}
                  inputProps={{ min: 0, step: 1000 }}
                  {...register("value", { 
                    required: "Value is required", 
                    min: 0,
                    onChange: (e) => {
                      setValue("value", e.target.value);
                      return e.target.value;
                    }
                  })}
                  value={watch("value") || ""}
                  error={!!errors.value}
                  helperText={errors.value?.message}
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Date Built"
                  type="date"
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    inputProps: { max: maxDate }
                  }}
                  {...register("builtDate", { 
                    required: "Date is required",
                    validate: value => {
                      const selectedDate = new Date(value);
                      return selectedDate <= today || "Date cannot be in the future";
                    },
                    onChange: (e) => {
                      setValue("builtDate", e.target.value);
                      return e.target.value;
                    }
                  })}
                  value={watch("builtDate") || ""}
                  error={!!errors.builtDate}
                  helperText={errors.builtDate?.message}
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Municipality Registration Number"
                  fullWidth
                  variant="outlined"
                  placeholder="Official registration number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ maxLength: MAX_LENGTH }}
                  {...register("municipalityRegistrationNumber", {
                    required: "Registration number is required",
                    maxLength: {
                      value: MAX_LENGTH,
                      message: `Registration number must be less than ${MAX_LENGTH} characters`,
                    },
                    onChange: (e) => {
                      setValue("municipalityRegistrationNumber", e.target.value);
                      return e.target.value;
                    }
                  })}
                  value={watch("municipalityRegistrationNumber") || ""}
                  error={!!errors.municipalityRegistrationNumber}
                  helperText={errors.municipalityRegistrationNumber?.message}
                  autoComplete="off"
                />
              </Grid>
            </Grid>
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="h6" fontWeight={600} mb={3} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ImageIcon color="primary" /> Property Image
            </Typography>
            <Card 
              variant="outlined" 
              sx={{ 
                mb: 3, 
                borderRadius: 2,
                borderStyle: 'dashed',
                borderWidth: '2px',
                borderColor: theme.palette.primary.light
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 4,
                  gap: 2,
                }}
              >
                <Box sx={{ 
                  width: '100%', 
                  height: '250px', 
                  backgroundColor: theme.palette.grey[100],
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 1,
                  mb: 2,
                  overflow: 'hidden',
                  position: 'relative',
                  border: previewUrl ? `2px solid ${theme.palette.primary.main}` : 'none'
                }}>
                  {previewUrl && (
                    <img 
                      src={previewUrl} 
                      alt="Property Preview" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                        e.target.parentNode.querySelector('.fallback-content').style.display = "flex";
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                  <Box 
                    className="fallback-content"
                    sx={{
                      position: previewUrl ? 'absolute' : 'static',
                      width: '100%',
                      height: '100%',
                      display: previewUrl ? 'none' : 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: theme.palette.grey[100],
                    }}
                  >
                    <FileUploadIcon
                      sx={{
                        fontSize: 60,
                        color: theme.palette.primary.main,
                        opacity: 0.7,
                        mb: 1
                      }}
                    />
                    <Typography variant="body2" color="textSecondary">
                      {previewUrl ? "Loading image preview..." : "Enter a URL for your property image"}
                    </Typography>
                  </Box>
                </Box>
                
                <TextField
                  label="Image URL"
                  fullWidth
                  variant="outlined"
                  placeholder="https://example.com/property-image.jpg"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ImageIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ maxLength: MAX_LENGTH }}
                  {...register("imageUrl", {
                    required: "Image URL is required",
                    maxLength: {
                      value: MAX_LENGTH,
                      message: `Image URL must be less than ${MAX_LENGTH} characters`,
                    },
                    onChange: (e) => {
                      setValue("imageUrl", e.target.value);
                      setPreviewUrl(e.target.value);
                      return e.target.value;
                    }
                  })}
                  value={watch("imageUrl") || ""}
                  error={!!errors.imageUrl}
                  helperText={errors.imageUrl?.message || "Enter a valid image URL to see preview above"}
                  autoComplete="off"
                />
              </CardContent>
            </Card>
          </>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            backgroundColor: theme.palette.background.paper,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              p: 3,
              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
              color: "white",
            }}
          >
            <HomeIcon sx={{ fontSize: 48, mb: 1 }} />
            <Typography variant="h4" fontWeight={700} mb={1}>
              Add Property
            </Typography>
            <Typography variant="body1">
              Complete the form to add your new property to the system
            </Typography>
          </Box>

          {serverError && (
            <Alert 
              severity="error" 
              sx={{ 
                mx: 3, 
                mt: 3, 
                borderRadius: 2 
              }}
            >
              {serverError}
            </Alert>
          )}

          <Box sx={{ p: { xs: 2, sm: 4 }, mt: 2 }}>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Box sx={{ mb: 4 }}>
                {getStepContent(activeStep)}
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ borderRadius: 2, px: 3 }}
                >
                  Back
                </Button>
                
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ 
                      px: 4, 
                      py: 1.5, 
                      borderRadius: 2,
                      boxShadow: 2,
                      '&:hover': {
                        boxShadow: 4,
                      }
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Adding..." : "Submit Property"}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    sx={{ 
                      px: 3, 
                      py: 1, 
                      borderRadius: 2,
                      boxShadow: 2,
                      '&:hover': {
                        boxShadow: 4,
                      }
                    }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </form>
          </Box>
        </Paper>
      </Container>

      <SampleFooter />
    </>
  );
};

export default AddProperty;