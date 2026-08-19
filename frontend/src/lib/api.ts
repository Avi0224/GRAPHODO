import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  withCredentials: true, // Send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for handling 401s and refreshing tokens
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't retried yet, and it's not a login/register request
    if (
      error.response?.status === 401 && 
      !originalRequest._retry && 
      originalRequest.url !== '/auth/refresh' &&
      originalRequest.url !== '/auth/login' &&
      originalRequest.url !== '/auth/register'
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1'}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        // If successful, retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token failed or expired
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
