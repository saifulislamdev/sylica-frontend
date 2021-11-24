import axios from 'axios';

export const API_BASE_URL =
  process.env.REACT_APP_PROXY || 'http://localhost:5000/api';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// REACT_APP_FRONTEND_PROXY is using cart page for temporarily untill order page is created
export const FRONT_END_BASE_URL =
  process.env.REACT_APP_FRONTEND_PROXY || 'http://localhost:3000/cart';
