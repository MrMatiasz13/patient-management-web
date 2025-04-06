import axios, { AxiosInstance } from "axios";

const axiosClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5001',
});

export default axiosClient;