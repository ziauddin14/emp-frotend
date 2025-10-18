import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://emp-api-production-4d66.up.railway.app/api", 
});

export default axiosInstance;
