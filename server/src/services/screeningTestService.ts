import { ScreeningTestDto } from "../dtos/screeningTestDto";
import ScreeningTestRepository from "../repositories/screeningTestRepository";

class ScreeningTestService {
  constructor(
    private readonly screeningTestRepository: ScreeningTestRepository
  ) {}

  async getAllScreeningTestsByPatientId(patientId: number) {
    return this.screeningTestRepository.findAllByPatientId(patientId);
  }

  async getScreeningTestById(id: number) {
    return this.screeningTestRepository.getById(id);
  }

  async createScreeningTest(data: ScreeningTestDto) {
    if (!data || !data.patientId || !data.date || !data.formState) {
      throw new Error("Invalid test data.");
    }

    const createdTest = await this.screeningTestRepository.create(data);
    return createdTest;
  }
}

export default ScreeningTestService;
