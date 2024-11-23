// import apiClient from './apiService';

// // Fetch a list of items (example)
// export const fetchItems = async () => {
//   try {
//     const response = await apiClient.get('/items');
//     return response;
//   } catch (error) {
//     console.error('Error fetching items:', error);
//     throw error;
//   }
// };

// // Post data to the server (example)
// export const createItem = async (data: any) => {
//   try {
//     const response = await apiClient.post('/items', data);
//     return response;
//   } catch (error) {
//     console.error('Error creating item:', error);
//     throw error;
//   }
// };

// // Example function to use Google API
// export const fetchGoogleData = async (endpoint: string, params: any) => {
//   try {
//     const response = await apiClient.get(
//       `${import.meta.env.VITE_BASE_GOOGLE_API_URL}${endpoint}`,
//       { params: { key: import.meta.env.VITE_GOOGLE_API_KEY, ...params } }
//     );
//     return response;
//   } catch (error) {
//     console.error('Error fetching Google API data:', error);
//     throw error;
//   }
// };
