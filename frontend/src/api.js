import axios from 'axios';

const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:5000/api' 
  : '/_backend/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include auth token
api.interceptors.request.use((config) => {
  const user = localStorage.getItem('currentUser');
  if (user) {
    const { token } = JSON.parse(user);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const chatWithAi = async (message, userId, file = null) => {
  try {
    if (file) {
      const formData = new FormData();
      formData.append('message', message);
      formData.append('userId', userId || '');
      formData.append('file', file);
      const response = await api.post('/chat', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      const response = await api.post('/chat', { message, userId });
      return response.data;
    }
  } catch (error) {
    console.error('Chat error:', error);
    throw error;
  }
};

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export const googleLogin = async (token) => {
  try {
    const response = await api.post('/auth/google', { token });
    return response.data;
  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
};

export default api;

