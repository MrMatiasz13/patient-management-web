import { AxiosError, AxiosInstance } from "axios";
import { Patient } from "../utils/types/patient";

class PatientService {
  private axiosClinet: AxiosInstance;

  constructor(axiosClient: AxiosInstance) {
    this.axiosClinet = axiosClient;
  }

  async getAllPatients() {
    try {
      const response = await this.axiosClinet.get("/api/patients");
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error("Patient error:", err.response?.data || err.message);
        return new AxiosError(err.response?.data || err.message);
      }

      console.error("Unexpected error:", err);
      return err;
    }
  }

  async getPatientById(id: number): Promise<Patient> {
    try {
      const response = await this.axiosClinet.get(`/api/patient/${id}`);
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error("Patient error:", err.response?.data || err.message);
        throw new AxiosError(err.response?.data || err.message);
      }

      console.error("Unexpected error:", err);
      throw err;
    }
  }

  async addPatient(patient: Partial<Patient>) {
    try {
      const data = {
        name: patient.name,
        surname: patient.surname,
        birthDate: patient.birthDate,
        phoneNumber: patient.phoneNumber,
      };

      const response = await this.axiosClinet.post(
        "/api/patients/create",
        data
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error("Patient error:", err.response?.data || err.message);
        return new AxiosError(err.response?.data || err.message);
      }

      console.error("Unexpected error:", err);
      return err;
    }
  }

  async deletePatient(patient: Patient) {
    try {
      const response = await this.axiosClinet.post(
        `/api/patients/delete/${patient.id}`
      );
      console.log(`Delete response: ${response.data}`);
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error("Patient error:", err.response?.data || err.message);
        return new AxiosError(err.response?.data || err.message);
      }

      console.error("Unexpected error:", err);
      return err;
    }
  }
}

export default PatientService;
