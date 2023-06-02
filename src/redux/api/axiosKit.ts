import axios from 'axios';
import { API_URL } from '../../constants';

const axiosKit = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json'
  }
});

// Add a request interceptor
axiosKit.interceptors.request.use(
  function (config: any) {
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosKit.interceptors.response.use(
  function (response: any) {
    return response.data;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

export default axiosKit;
