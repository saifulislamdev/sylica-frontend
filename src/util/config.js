import axios from 'axios';

export const API_BASE_URL =
  process.env.REACT_APP_PROXY || 'http://localhost:4242/api';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});
