import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

export default function MyProfile() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "personal"
  );
  const [editPersonal, setEditPersonal] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [address, setAddress] = useState({
    doorNo: "",
    street: "",
    city: "",
    zipcode: "",
    state: "",
    country: "",
  });

  const [policies, setPolicies] = useState([]);
  const [loadingPolicies, setLoadingPolicies] = useState(false);

  const [properties, setProperties] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // eslint-disable-next-line no-unused-vars
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleEditMode = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    if (activeTab === "personal") {
      if (editPersonal) {
        try {
          const payload = {
            firstName: personalInfo.firstName,
            lastName: personalInfo.lastName,
          };
          await axios.put("http://localhost:8085/auth/update", payload, config);
          toast.success("Personal info updated successfully");
        } catch (err) {
          toast.error(err.response?.data?.message || "Failed to update personal info");
        }
      }
      setEditPersonal(!editPersonal);
    } else if (activeTab === "address") {
      if (editAddress) {
        const addressString = `${address.doorNo}, ${address.street}, ${address.city}, ${address.state} - ${address.zipcode}, ${address.country}`;
        try {
          await axios.put("http://localhost:8085/auth/update", { address: addressString }, config);
          toast.success("Address updated successfully");
        } catch (err) {
          toast.error(err.response?.data?.message || "Failed to update address");
        }
      }
      setEditAddress(!editAddress);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      setLoadingProfile(true);

      try {
        const response = await axios.get("http://localhost:8085/auth/profile", config);
        const userData = response.data;
        
        setPersonalInfo({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
        });

        if (userData.address) {
          const addressParts = userData.address.split(/,\s*/);
          setAddress({
            doorNo: addressParts[0] || "",
            street: addressParts[1] || "",
            city: addressParts[2] || "",
            state: addressParts[3]?.split(" - ")[0] || "",
            zipcode: addressParts[3]?.split(" - ")[1] || "",
            country: addressParts[4] || "",
          });
        }
      } catch (error) {
        toast.error("Failed to load profile data");
        console.error("Error fetching profile data", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    if (activeTab === "policies") {
      fetchPolicies();
    }
  }, [activeTab]);

  const fetchPolicies = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    setLoadingPolicies(true);
    try {
      const response = await axios.get(
        "http://localhost:8085/api/policies/user", 
        config
      );
      setPolicies(response.data);
    } catch (error) {
      toast.error("Failed to fetch policies");
      console.error("Error fetching policies", error);
    } finally {
      setLoadingPolicies(false);
    }
  };

  useEffect(() => {
    if (activeTab === "properties") {
      fetchProperties();
    }
  }, [activeTab]);

  const fetchProperties = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    setLoadingProperties(true);
    try {
      const response = await axios.get(
        "http://localhost:8085/api/properties/my", 
        config
      );
      setProperties(response.data);
    } catch (error) {
      toast.error("Failed to fetch properties");
      console.error("Error fetching properties", error);
    } finally {
      setLoadingProperties(false);
    }
  };

  const handlePersonalChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleViewPolicyDetails = (policyId) => {
    toast.info(`Viewing details for policy: ${policyId}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loadingProfile) {
    return <div className={`loading-text ${darkMode ? 'dark' : ''}`}>Loading profile...</div>;
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <style>
        {`
          :root {
            --primary-bg: #f8f9fa;
            --secondary-bg: #ffffff;
            --text-color: #333333;
            --header-bg: #1a2238;
            --sidebar-bg: #ffffff;
            --card-bg: #ffffff;
            --border-color: #eeeeee;
            --hover-bg: #f5f5f5;
            --active-bg: #f0f7ff;
            --button-primary: #1a2238;
            --button-primary-hover: #12182b;
          }

          .dark {
            --primary-bg: #121212;
            --secondary-bg: #1e1e1e;
            --text-color: #e0e0e0;
            --header-bg: #0d1117;
            --sidebar-bg: #1e1e1e;
            --card-bg: #2d2d2d;
            --border-color: #444444;
            --hover-bg: #333333;
            --active-bg: #2a3a4d;
            --button-primary: #3a4a6b;
            --button-primary-hover: #2d3a5a;
          }

          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0px;
            padding: 0;
            background-color: var(--primary-bg);
            color: var(--text-color);
            transition: all 0.3s ease;
          }

          .layout {
            display: flex;
            min-height: calc(100vh - 64px);
          }

          .sidebar {
            width: 280px;
            background-color: var(--sidebar-bg);
            padding: 20px 0;
            color: var(--text-color);
            box-shadow: 2px 0 5px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
          }

          .profile-section {
            padding: 20px;
            border-bottom: 1px solid var(--border-color);
            text-align: center;
          }

          .profile-name {
            margin: 10px 0 5px;
            font-size: 18px;
            font-weight: 600;
            color: var(--text-color);
            padding: 20px;
          }

          .profile-email {
            color: var(--text-color);
            opacity: 0.8;
            font-size: 14px;
            margin-bottom: 10px;
          }

          .nav-list {
            list-style: none;
            padding: 0;
            margin: 20px 0;
          }

          .nav-item {
            padding: 12px 25px;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            font-size: 15px;
            color: var(--text-color);
          }

          .nav-item:hover {
            background-color: var(--hover-bg);
          }

          .nav-item.active {
            background-color: var(--active-bg);
            color: var(--text-color);
            border-left: 4px solid var(--button-primary);
            font-weight: 500;
          }

          .nav-icon {
            margin-right: 12px;
            font-size: 18px;
          }

          .main-content {
            flex: 1;
            padding: 30px;
            background-color: var(--primary-bg);
            transition: all 0.3s ease;
          }

          .dashboard-title {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 25px;
            color: var(--text-color);
            padding: 30px;
          }

          .content-card {
            background-color: var(--card-bg);
            border-radius: 8px;
            padding: 25px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            margin-bottom: 25px;
            transition: all 0.3s ease;
          }

          .section-title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 20px;
            color: var(--text-color);
            padding-bottom: 10px;
            border-bottom: 1px solid var(--border-color);
          }

          .form-group {
            margin-bottom: 20px;
          }

          .form-label {
            font-weight: 500;
            display: block;
            margin-bottom: 8px;
            color: var(--text-color);
            font-size: 14px;
          }

          .form-input {
            width: 100%;
            max-width: 500px;
            padding: 10px 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-size: 14px;
            transition: all 0.3s;
            background-color: var(--card-bg);
            color: var(--text-color);
          }

          .form-input:focus {
            border-color: var(--button-primary);
            outline: none;
          }

          .form-input:disabled {
            background-color: var(--hover-bg);
            color: var(--text-color);
            opacity: 0.7;
          }

          .button {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s;
          }

          .button-primary {
            background-color: var(--button-primary);
            color: white;
          }

          .button-primary:hover {
            background-color: var(--button-primary-hover);
          }

          .button-success {
            background-color: #28a745;
            color: white;
          }

          .button-success:hover {
            background-color: #218838;
          }

          .table-container {
            overflow-x: auto;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }

          .table {
            width: 100%;
            border-collapse: collapse;
            background-color: var(--card-bg);
            color: var(--text-color);
          }

          .table th, .table td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid var(--border-color);
            color: var(--text-color);
          }

          .table th {
            background-color: var(--hover-bg);
            font-weight: 600;
            font-size: 14px;
          }

          .table tr:hover {
            background-color: var(--hover-bg);
          }

          .status-badge {
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: bold;
            color: white;
            display: inline-block;
          }

          .status-active {
            background-color: #28a745;
            color: white;
          }

          .status-pending {
            background-color: #dc3545;
            color: white;
          }

          .status-inactive {
            background-color: #6c757d;
            color: white;
          }

          .loading-text {
            text-align: center;
            padding: 40px;
            color: var(--text-color);
            font-style: italic;
          }

          .empty-state {
            text-align: center;
            padding: 40px;
            color: var(--text-color);
          }

          .empty-state-icon {
            font-size: 48px;
            margin-bottom: 20px;
            color: var(--border-color);
          }

          .two-columns {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }

          @media (max-width: 768px) {
            .layout {
              flex-direction: column;
            }
            .sidebar {
              width: 100%;
            }
            .two-columns {
              grid-template-columns: 1fr;
            }
          }

          .property-image-cell {
            width: 80px;
          }

          .property-image {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 4px;
          }

          .property-actions {
            display: flex;
            gap: 8px;
          }

          .action-button {
            padding: 5px 10px;
            font-size: 12px;
          }

          .table th, .table td {
            vertical-align: middle;
          }

          .currency-cell {
            font-family: monospace;
            text-align: right;
          }

          .date-cell {
            white-space: nowrap;
          }
        `}
      </style>

      <div className="layout">
        <div className="sidebar">
          <div className="profile-section">
            <h3 className="profile-name">
              {personalInfo.firstName} {personalInfo.lastName}
            </h3>
            <div className="profile-email">{personalInfo.email}</div>
          </div>

          <ul className="nav-list">
            <li
              className={`nav-item ${activeTab === "personal" ? "active" : ""}`}
              onClick={() => setActiveTab("personal")}
            >
              <span className="nav-icon">👤</span>
              Personal Information
            </li>
            <li
              className={`nav-item ${activeTab === "address" ? "active" : ""}`}
              onClick={() => setActiveTab("address")}
            >
              <span className="nav-icon">🏠</span>
              Address
            </li>
            <li
              className={`nav-item ${activeTab === "policies" ? "active" : ""}`}
              onClick={() => setActiveTab("policies")}
            >
              <span className="nav-icon">📄</span>
              My Policies
            </li>
            <li
              className={`nav-item ${activeTab === "properties" ? "active" : ""}`}
              onClick={() => setActiveTab("properties")}
            >
              <span className="nav-icon">🏢</span>
              My Properties
            </li>
          </ul>
        </div>

        <div className="main-content">
          <h2 className="dashboard-title">User Dashboard</h2>

          {activeTab === "personal" && (
            <div className="content-card">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input
                  name="firstName"
                  value={personalInfo.firstName}
                  onChange={handlePersonalChange}
                  disabled={!editPersonal}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input
                  name="lastName"
                  value={personalInfo.lastName}
                  onChange={handlePersonalChange}
                  disabled={!editPersonal}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  value={personalInfo.email}
                  readOnly
                  className="form-input"
                  disabled
                />
              </div>
              <button
                onClick={toggleEditMode}
                className={`button ${editPersonal ? "button-success" : "button-primary"}`}
              >
                {editPersonal ? "Save Changes" : "Edit Profile"}
              </button>
            </div>
          )}

          {activeTab === "address" && (
            <div className="content-card">
              <div className="two-columns">
                {Object.entries(address).map(([key, value]) => (
                  <div key={key} className="form-group">
                    <label className="form-label">
                      {key.replace(/([A-Z])/g, " $1").replace(/^\w/, c => c.toUpperCase())}
                    </label>
                    <input
                      name={key}
                      value={value}
                      onChange={handleAddressChange}
                      disabled={!editAddress}
                      className="form-input"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={toggleEditMode}
                className={`button ${editAddress ? "button-success" : "button-primary"}`}
              >
                {editAddress ? "Save Changes" : "Edit Address"}
              </button>
            </div>
          )}

          {activeTab === "policies" && (
            <div className="content-card">
              {loadingPolicies ? (
                <div className="loading-text">Loading policies...</div>
              ) : policies.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">📄</div>
                  <p>No policies found</p>
                  <button className="button button-primary" onClick={fetchPolicies}>
                    Refresh
                  </button>
                </div>
              ) : (
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Policy Number</th>
                        <th>Type</th>
                        <th>Coverage Details</th>
                        <th>Status</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Premium</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {policies.map((policy) => (
                        <tr key={policy.policyId}>
                          <td style={{ color: 'var(--text-color)' }}>{policy.policyNumber}</td>
                          <td style={{ color: 'var(--text-color)' }}>{policy.type}</td>
                          <td style={{ color: 'var(--text-color)' }}>
                            {policy.coverageDetails && policy.coverageDetails.length > 50
                              ? `${policy.coverageDetails.substring(0, 50)}...`
                              : policy.coverageDetails}
                          </td>
                          <td>
                            <span className={`status-badge ${
                              policy.status === "ACTIVE" || policy.status === "APPROVED" 
                                ? "status-active" 
                                : policy.status === "PENDING" 
                                  ? "status-pending" 
                                  : "status-inactive"
                            }`}>
                              {policy.status}
                            </span>
                          </td>
                          <td style={{ color: 'var(--text-color)' }}>
                            {policy.startDate ? new Date(policy.startDate).toLocaleDateString() : 'N/A'}
                          </td>
                          <td style={{ color: 'var(--text-color)' }}>
                            {policy.endDate ? new Date(policy.endDate).toLocaleDateString() : 'N/A'}
                          </td>
                          <td style={{ color: 'var(--text-color)' }}>
                            ₹{policy.premium?.toLocaleString('en-IN')}
                          </td>
                          <td>
                            <button
                              onClick={() => handleViewPolicyDetails(policy.policyId)}
                              className="button button-primary"
                              style={{ padding: "5px 15px" }}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "properties" && (
            <div className="content-card">
              {loadingProperties ? (
                <div className="loading-text">Loading properties...</div>
              ) : properties.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">🏢</div>
                  <p>No properties found</p>
                  <button className="button button-primary" onClick={fetchProperties}>
                    Refresh
                  </button>
                </div>
              ) : (
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Address</th>
                        <th>City</th>
                        <th>Zip Code</th>
                        <th>Type</th>
                        <th>Size (sq ft)</th>
                        <th>Rooms</th>
                        <th>Built Date</th>
                        <th>Estimated Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.map((property) => (
                        <tr key={property.propertyId}>
                          <td style={{ color: 'var(--text-color)' }}>
                            {property.address || 'N/A'}
                          </td>
                          <td style={{ color: 'var(--text-color)' }}>
                            {property.city || 'N/A'}
                          </td>
                          <td style={{ color: 'var(--text-color)' }}>
                            {property.zipcode || property.zipCode || 'N/A'}
                          </td>
                          <td style={{ color: 'var(--text-color)' }}>
                            {property.type || 'N/A'}
                          </td>
                          <td style={{ color: 'var(--text-color)' }}>
                            {property.size || property.size || 'N/A'}
                          </td>
                          <td style={{ color: 'var(--text-color)' }}>
                            {property.numberOfRooms || property.rooms || 'N/A'}
                          </td>
                          <td style={{ color: 'var(--text-color)' }}>
                            {property.dateBuilt ? formatDate(property.dateBuilt) : 'N/A'}
                          </td>
                          <td style={{ color: 'var(--text-color)' }}>
                            {property.estimatedAmount || property.estimatedAmount ? 
                              `₹${(property.estimatedAmount || property.estimatedAmount).toLocaleString('en-IN')}` : 
                              'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}