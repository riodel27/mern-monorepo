import axios from 'axios';

axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
   baseURL: 'http://localhost:8000/api/'
});
