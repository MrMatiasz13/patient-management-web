import { AxiosError, AxiosInstance } from "axios";
import { Patient } from "../utils/types/patient";

class PatientService {
    private axiosClinet: AxiosInstance;

    constructor(axiosClient: AxiosInstance) {
        this.axiosClinet = axiosClient;
    }

    async getAllPatients() {
        try {
            const response = await this.axiosClinet.get('/api/patients');
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

    async addPatient(patient: Patient) {
        try {
            const data = { 
                name: patient.name, 
                surename: patient.surename, 
                phoneNumber: patient.phoneNumber 
            };

            const response = await this.axiosClinet.post('/api/patients/create', data); 
            console.log(response.data);
            return response.data;
        } catch (err) {
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