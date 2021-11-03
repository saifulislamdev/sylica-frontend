import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_PROXY || 'http://localhost:5000/api',
});
