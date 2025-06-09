import { AxiosInstance } from "axios";
import { CreateScreeningTestDto } from "../utils/types/models/dtos/createScreeningTestDto";
import { ScreeningTest } from "../utils/types/models/screeningTest";

class ScreeningTestService {
  private axiosClient: AxiosInstance;

  constructor(axiosClient: AxiosInstance) {
    this.axiosClient = axiosClient;
  }

  async getAllScreeningTestForPatient(
    patientId: number
  ): Promise<ScreeningTest[]> {
    const response = await this.axiosClient.get(
      `/api/${patientId}/screening-tests`
    );
    return response.data.screeningTests;
  }

  async getScreeningTestById(id: number): Promise<ScreeningTest> {
    const response = await this.axiosClient.get(`/api/screening-test/${id}`);
    return response.data;
  }

  async createScreeningTest(
    screeningTest: CreateScreeningTestDto
  ): Promise<ScreeningTest> {
    const response = await this.axiosClient.post(
      "/api/screening-test/create",
      screeningTest
    );
    return response.data;
  }
}

export default ScreeningTestService;
