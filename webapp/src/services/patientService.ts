import { AxiosError, AxiosInstance } from "axios";
import { Patient } from "../utils/types/models/patient";

class PatientService {
  private axiosClinet: AxiosInstance;

  constructor(axiosClient: AxiosInstance) {
    this.axiosClinet = axiosClient;
  }

  async getAllPatients() {
    try {
      const response = await this.axiosClinet.get("/api/patients");
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getPatientById(id: number): Promise<Patient> {
    try {
      const response = await this.axiosClinet.get(`/api/patient/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
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
    } catch (error) {
      this.handleError(error);
    }
  }

  async deletePatient(patient: Patient) {
    try {
      const response = await this.axiosClinet.post(
        `/api/patients/delete/${patient.id}`
      );
      console.log(`Delete response: ${response.data}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown): never {
    if (error instanceof AxiosError) {
      console.error("Patient error:", error.response?.data || error.message);
      throw new AxiosError(error.response?.data || error.message);
    }

    console.error("Unexpected error: ", error);
    throw new Error("Unexpected error occurred.");
  }
}

export default PatientService;
