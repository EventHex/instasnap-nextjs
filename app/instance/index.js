import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://app-api.eventhex.ai/api/v1',
  baseURL: 'http://localhost:8074/api/v1',  
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to attach token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Send only the token as that's what's working in the actual requests
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;






