import { ScreeningTestDto } from "../dtos/screeningTestDto";
import SequelizeScreeningTest from "../models/screeningTest";
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

  async deleteScreeningTestById(id: number): Promise<boolean> {
    const deletedCount = await this.screeningTestRepository.delete(id);
    return deletedCount > 0;
  }

  async deleteAllPatientScreeningTests(
    screeningTests: SequelizeScreeningTest[]
  ) {
    await Promise.all(
      screeningTests.map((test) => {
        return this.screeningTestRepository.delete(test.id);
      })
    );
  }
}

export default ScreeningTestService;
