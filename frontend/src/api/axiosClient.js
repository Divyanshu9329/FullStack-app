import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api', // backend base URL
});

// you can add interceptors here later if needed

export default axiosClient;
