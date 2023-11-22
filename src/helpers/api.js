import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

let isRefreshing = false;
let refreshQueue = [];

// Function to refresh the token
const refreshApi = async () => {
  if (!isRefreshing) {
    isRefreshing = true;

    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        const response = await api.post('/refresh_token', { refreshToken });
        const token = response.data.token;

        localStorage.setItem('token', token);

        // Retry all the queued requests with the new token
        refreshQueue.forEach((resolve) => {
          resolve(token);
        });

        refreshQueue = [];
      } else {
        // Handle the case where there is no refresh token (user is not logged in)
        // For example, you can redirect the user to the login page.
        // You can also throw an error or take other appropriate actions.
        // In this example, we just clear the queue.
        refreshQueue = [];
      }
    } catch (error) {
      // Handle refresh token error or redirect to login
      throw error;
    } finally {
      // Set isRefreshing to false regardless of success or failure
      isRefreshing = false;
    }
  }

  // If isRefreshing is true, we will return a Promise that resolves when the token is refreshed.
  return new Promise((resolve) => {
    refreshQueue.push(resolve);
  });
};

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = await refreshApi();

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
        throw error;
      }
    }

    if (error.response && error.response.data && error.response.data.error) {
      return Promise.reject(error.response.data.error);
    }

    return Promise.reject(error.response.data?.error);
  }
);

export default api;
