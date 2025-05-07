import React, { useState } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Paper,
  useTheme,
  FormControl,
  InputLabel,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SampleFooter from '../auth/SampleFooter';

const Coverage = () => {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    damageReason: '',
    propertyValue: '',
    propertyDamageValue: '',
    propertyAgeYears: '',
    description: '',
    premium: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckPremium = () => {
    const {
      damageReason,
      propertyValue,
      propertyDamageValue,
      propertyAgeYears,
      description,
    } = formData;

    if (!damageReason || !propertyValue || !propertyDamageValue || !propertyAgeYears || !description) {
      toast.error('Please fill all required fields!');
      return;
    }

    const value = parseFloat(propertyValue);
    let damageValue = parseFloat(propertyDamageValue);
    const ageYears = parseInt(propertyAgeYears);

    if (damageValue > value) {
      toast.error('Damage value cannot exceed property value!');
      return;
    }

    let adjustedPremium = damageValue * 0.95;

    if (ageYears > 3) {
      const extraYears = ageYears - 3;
      const ageReduction = extraYears * 0.02;
      adjustedPremium *= (1 - ageReduction);
    }

    setFormData((prev) => ({
      ...prev,
      premium: adjustedPremium.toFixed(2),
    }));

    toast.success('Coverage calculated successfully!');
  };

  return (
    <>
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: '100vh',
        py: 10,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} theme={theme.palette.mode} />

      <Paper
        elevation={4}
        sx={{
          p: 4,
          maxWidth: 650,
          width: '100%',
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Home Insurance Coverage Estimator
        </Typography>

        <Box component="form" noValidate autoComplete="off">
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <TextField
              name="damageReason"
              label="Damage Reason"
              placeholder="Fire, Floods, Theft"
              fullWidth
              value={formData.damageReason}
              onChange={handleChange}
            />
            <TextField
              name="propertyValue"
              label="Property Value"
              fullWidth
              value={formData.propertyValue}
              onChange={handleChange}
              inputProps={{ inputMode: 'numeric' }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <TextField
              name="propertyDamageValue"
              label="Property Damage Value"
              fullWidth
              value={formData.propertyDamageValue}
              onChange={handleChange}
              inputProps={{ inputMode: 'numeric' }}
            />
            <TextField
              name="description"
              label="Description"
              fullWidth
              value={formData.description}
              onChange={handleChange}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="property-age-label">Property Age (Years)</InputLabel>
              <Select
                labelId="property-age-label"
                name="propertyAgeYears"
                value={formData.propertyAgeYears}
                onChange={handleChange}
                label="Property Age (Years)"
                sx={{
                  '& .MuiSelect-icon': {
                    display: 'none', // Hide the default spinner icon
                  },
                  '& fieldset': {
                    borderRadius: '6px', // Optional: to make the border rounded
                  },
                }}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {Array.from({ length: 51 }, (_, i) => (
                  <MenuItem key={i} value={i}>{i} yr</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleCheckPremium}
            sx={{ mt: 2 }}
          >
            Calculate Coverage
          </Button>

          {formData.premium && (
            <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
              Estimated Coverage Amount: ₹ {formData.premium}
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
    <SampleFooter></SampleFooter>
    </>
  );
};

export default Coverage;
