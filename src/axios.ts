import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_LOCAL_BASE_URL,
  // baseURL: import.meta.env.VITE_AXIOS_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export default axiosInstance ; 