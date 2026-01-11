import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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

// Autoryzacja
export const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const register = async (username, password, email) => {
  const response = await api.post('/auth/register', { username, password, email });
  return response.data;
};

// Książki
export const getBooks = async () => {
  const response = await api.get('/books');
  return response.data;
};

export const getBook = async (id) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

export const createBook = async (bookData) => {
  const response = await api.post('/books', bookData);
  return response.data;
};

export const updateBook = async (id, bookData) => {
  const response = await api.put(`/books/${id}`, bookData);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};

// Rezerwacje
export const getReservations = async () => {
  const response = await api.get('/reservations');
  return response.data;
};

export const getUserReservations = async () => {
  const response = await api.get('/reservations/user');
  return response.data;
};

export const createReservation = async (bookId) => {
  const response = await api.post('/reservations', { bookId });
  return response.data;
};

export const cancelReservation = async (id) => {
  const response = await api.patch(`/reservations/${id}/cancel`);
  return response.data;
};

export const completeReservation = async (id) => {
  const response = await api.patch(`/reservations/${id}/complete`);
  return response.data;
};

export const getStats = async () => {
  const response = await api.get('/reservations/stats');
  return response.data;
};

export default api;
