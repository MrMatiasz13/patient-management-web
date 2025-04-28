import { AxiosError, AxiosInstance } from "axios";

class PatientService {
    private axiosClinet: AxiosInstance;

    constructor(axiosClient: AxiosInstance) {
        this.axiosClinet = axiosClient;
    }

    async getAllPatients() {
        try {
            const response = await this.axiosClinet.get('/api/patients');
            console.log(response.data);
            return response.data;
        } catch(err) {
            if (err instanceof AxiosError) {
                console.error('Patient error:', err.response?.data || err.message);
                return new AxiosError(err.response?.data || err.message);
            }
            
            console.error('Unexpected error:', err);
            return err;
        }
    }
}

export default PatientService;