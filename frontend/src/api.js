import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const chatWithAi = async (query) => {
  try {
    const response = await api.post('/chat', { query });
    return response.data;
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
