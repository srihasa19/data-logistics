import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: parseInt(process.env.REACT_APP_TIMEOUT),
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  register: (data) =>
    api.post('/auth/register', data),
  login: (data) =>
    api.post('/auth/login', data),
};

export const userApi = {
  getAllDrivers: () =>
    api.get('/users/drivers'),
  getUserById: (id) =>
    api.get(`/users/${id}`),
};

export const deliveryApi = {
  createDelivery: (data) =>
    api.post('/deliveries', data),
  getDeliveryById: (id) =>
    api.get(`/deliveries/${id}`),
  getAllDeliveries: () =>
    api.get('/deliveries'),
  assignDriver: (deliveryId, driverId) =>
    api.put(`/deliveries/${deliveryId}/assign-driver/${driverId}`),
  updateDeliveryStatus: (deliveryId, data) =>
    api.put(`/deliveries/${deliveryId}/status`, data),
};

export default api;
