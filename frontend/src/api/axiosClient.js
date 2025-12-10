import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://flipertask.onrender.com/api";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosClient;
