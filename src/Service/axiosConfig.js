import axios from 'axios';
export const baseURL = 'http://127.0.0.1:8000/api';



export const axiosInstance = axios.create({
  baseURL: baseURL,
});

const axiosAuth = axios.create({
  baseURL: baseURL,
});

axiosAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

 

axiosAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.error('Error Response:', error);

    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axiosAuth.post('/authentication/token/refresh/', {
          refresh: localStorage.getItem('refreshToken'),
        });

        const newAccessToken = refreshResponse.data.access;
        localStorage.setItem('accessToken', newAccessToken);

        
        // Retry the original request with the new access token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosAuth(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        return Promise.reject(error)
       
      }
    }

    return Promise.reject(error);
  }
);


export default axiosAuth;