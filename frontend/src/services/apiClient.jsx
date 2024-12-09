import axios from 'axios';
import { getAuthToken } from '../utils/auth';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Attach the token to every request
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
