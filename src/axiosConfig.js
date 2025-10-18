import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://emp-api-production.up.railway.app/api",
});

export default axiosInstance;