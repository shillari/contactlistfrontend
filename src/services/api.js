import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8081/api/v1',
    headers: {
    'Content-Type': 'application/json', // Set content type to JSON
  }
})

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response !== null && error.response.status !== null) {
          if (error.response.status === 403) {
            alert(`Expired session, please log in again!`);
            localStorage.clear();
          }
        }
    }
)

export default api