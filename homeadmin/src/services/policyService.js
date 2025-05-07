// import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/policies'; // Update with your actual backend URL

// const policyService = {
//   // Get all policies
//   getAllPolicies: async () => {
//     try {
//       const response = await axios.get(API_URL);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching policies:', error);
//       throw error;
//     }
//   },

//   // Get policy by ID
//   getPolicyById: async (id) => {
//     try {
//       const response = await axios.get(`${API_URL}/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching policy:', error);
//       throw error;
//     }
//   },

//   // Create new policy
//   createPolicy: async (policyData) => {
//     try {
//       const response = await axios.post(API_URL, policyData);
//       return response.data;
//     } catch (error) {
//       console.error('Error creating policy:', error);
//       throw error;
//     }
//   },

//   // Update policy
//   updatePolicy: async (id, policyData) => {
//     try {
//       const response = await axios.put(`${API_URL}/${id}`, policyData);
//       return response.data;
//     } catch (error) {
//       console.error('Error updating policy:', error);
//       throw error;
//     }
//   },

//   // Delete policy
//   deletePolicy: async (id) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//     } catch (error) {
//       console.error('Error deleting policy:', error);
//       throw error;
//     }
//   }
// };

// export default policyService; 