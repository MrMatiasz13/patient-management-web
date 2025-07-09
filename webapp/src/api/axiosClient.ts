import axios, { AxiosInstance } from "axios";

const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:5002",
  withCredentials: true,
});

export default axiosClient;
