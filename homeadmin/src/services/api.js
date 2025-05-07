import api from '../config/axios'; // points to your customized axios.js

// Auth endpoints
export const login = async (formData) => {
  return await api.post('/api/admin/login', {
    email: formData.email,
    password: formData.password
  });
};

// User endpoints
export const getUsers = () => api.get('/users');
export const getUserById = (id) => api.get(`/users/${id}`);
export const createUser = (userData) => api.post('/users', userData);
export const updateUser = (id, userData) => api.put(`/users/${id}`, userData);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Policy endpoints
export const getAdminPolicies = () => api.get('/api/admin/policies/all');
export const approvePolicy = (id) => api.put(`/api/admin/policies/${id}/approve`);
export const rejectPolicy = (id, reason) =>
  api.put(`/api/admin/policies/${id}/reject`, { reason });
export const deleteAdminPolicy = (id) => api.delete(`/api/admin/policies/${id}`);

// Claim endpoints (only admin-related now)
export const getAllClaims = () => api.get('/api/admin/claims/all');
export const approveClaim = (claimId) => api.put(`/api/admin/claims/${claimId}/approve`);
export const rejectClaim = (claimId, payload) =>
  api.put(`/api/admin/claims/${claimId}/reject`, payload);
export const deleteClaim = (claimId) => api.delete(`/api/admin/claims/${claimId}`);


// Dashboard endpoints
export const getDashboardStats = () => api.get('/dashboard/stats');
export const getRecentActivity = () => api.get('/dashboard/activity');




// Document endpoints
export const getDocuments = () => api.get('/api/admin/documents/all'); // Fetch all documents
export const downloadDocument = (fileName) =>
  api.get(`/api/admin/documents/download/${fileName}`, {
    responseType: 'blob',
  });
