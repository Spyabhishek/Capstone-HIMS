import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '@mui/material/styles';
import SampleFooter from '../auth/SampleFooter';

const PremiumCalculator = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    propertyAge: '',
    floors: '',
    riskLevel: '',
    fireAlarm: false,
    fireEscapeSteps: false,
    fireSafetyEquipment: false,
    floodCover: false,
    earthquakeCover: false,
    theftProtection: false,
    premium: '',
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const { propertyAge, floors, riskLevel } = formData;
    return (
      propertyAge.trim() !== '' &&
      floors.trim() !== '' &&
      riskLevel.trim() !== ''
    );
  };

  const handleCheckPremium = () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields before calculating premium.');
      return;
    }

    const basePremium = 3500;
    let calculatedPremium = basePremium;

    const propertyAge = parseInt(formData.propertyAge);
    if (propertyAge > 3) {
      const ageYearsBeyond3 = propertyAge - 3;
      calculatedPremium += basePremium * 0.02 * ageYearsBeyond3;
    }

    calculatedPremium += basePremium * 0.05 * formData.floors;

    if (formData.riskLevel === 'High') {
      calculatedPremium += basePremium * 0.1;
    } else if (formData.riskLevel === 'Low') {
      calculatedPremium -= basePremium * 0.05;
    }

    const securityFeaturesCount =
      (formData.fireAlarm ? 1 : 0) +
      (formData.fireEscapeSteps ? 1 : 0) +
      (formData.fireSafetyEquipment ? 1 : 0);

    calculatedPremium -= calculatedPremium * 0.05 * securityFeaturesCount;

    if (formData.floodCover) calculatedPremium += basePremium * 0.05;
    if (formData.earthquakeCover) calculatedPremium += basePremium * 0.05;
    if (formData.theftProtection) calculatedPremium += basePremium * 0.05;

    setFormData((prevData) => ({
      ...prevData,
      premium: calculatedPremium.toFixed(2),
    }));

    toast.success('Premium calculated successfully!');
  };

  return (
    <>
        <div className="premium-container" style={{ background: theme.palette.background.default }}>
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
        style={{ marginTop: '60px' }}
      />

      <form>
        {/* Row 1: Property Age & Floors */}
        <div className="row">
          <input
            type="number"
            name="propertyAge"
            placeholder="Property Age (years)"
            value={formData.propertyAge}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="floors"
            placeholder="Number of Floors"
            value={formData.floors}
            onChange={handleChange}
            required
          />
        </div>

        {/* Row 2: Risk Level */}
        <div className="row">
          <select
            name="riskLevel"
            value={formData.riskLevel}
            onChange={handleChange}
            required
          >
            <option value="">Select Risk Level</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Security Features as checkboxes */}
        <div className="checkbox-group">
          <h3>Select Security Features</h3>
          <label>
            <input
              type="checkbox"
              name="fireAlarm"
              checked={formData.fireAlarm}
              onChange={handleChange}
            />
            Fire Alarm
          </label>
          <label>
            <input
              type="checkbox"
              name="fireEscapeSteps"
              checked={formData.fireEscapeSteps}
              onChange={handleChange}
            />
            Fire Escape Steps
          </label>
          <label>
            <input
              type="checkbox"
              name="fireSafetyEquipment"
              checked={formData.fireSafetyEquipment}
              onChange={handleChange}
            />
            Fire Safety Equipment
          </label>
        </div>

        {/* Select Coverage heading */}
        <div className="checkbox-group">
          <h3>Select Coverage</h3>
          <label>
            <input
              type="checkbox"
              name="floodCover"
              checked={formData.floodCover}
              onChange={handleChange}
            />
            Include Flood Cover
          </label>
          <label>
            <input
              type="checkbox"
              name="earthquakeCover"
              checked={formData.earthquakeCover}
              onChange={handleChange}
            />
            Include Earthquake Cover
          </label>
          <label>
            <input
              type="checkbox"
              name="theftProtection"
              checked={formData.theftProtection}
              onChange={handleChange}
            />
            Include Theft Protection
          </label>
        </div>

        <button
          type="button"
          className="btn"
          style={{ backgroundColor: theme.palette.primary.main }}
          onClick={handleCheckPremium}
          disabled={!validateForm()}
        >
          Calculate Premium
        </button>

        <div className="premium-output" style={{ color: theme.palette.text.primary }}>
          {formData.premium && <p>Estimated Premium: ₹ {formData.premium}</p>}
        </div>
      </form>

      <style jsx>{`
        .premium-container {
          padding: 30px;
          max-width: 650px;
          margin: 100px auto;
          border: 1px solid #ccc;
          border-radius: 10px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
        }
        form {
          display: flex;
          flex-direction: column;
        }
        .row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
        }
        input[type='text'],
        input[type='number'],
        select {
          width: 48%;
          padding: 12px;
          font-size: 16px;
          border: 1px solid #aaa;
          border-radius: 6px;
        }
        select {
          background: white;
        }
        .checkbox-group {
          margin: 0 0 1px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .checkbox-group label {
          font-size: 16px;
        }
        .checkbox-group h3 {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 0px;
        }
        .btn {
          color: white;
          border: none;
          padding: 12px;
          margin-top: 15px;
          font-size: 18px;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        .btn:hover:not(:disabled) {
          background-color: #356bb3;
        }
        .premium-output {
          margin: 20px 0;
          font-weight: bold;
          font-size: 20px;
          text-align: center;
        }
        input[type="number"] {
          -moz-appearance: textfield;
          -webkit-appearance: none;
          appearance: none;
        }
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </div>
    <SampleFooter></SampleFooter>
    </>
  );
};

export default PremiumCalculator;
