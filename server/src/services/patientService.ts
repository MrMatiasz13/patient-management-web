import { PatientDto } from "../dtos/patientDto";
import SequelizePatient from "../models/patient";
import PatientRepository from "../repositories/patientRepository";
import ScreeningTestService from "./screeningTestService";

class PatientService {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly screeningTestService: ScreeningTestService
  ) {}

  async getAllPatients(): Promise<SequelizePatient[]> {
    return this.patientRepository.findAll();
  }

  async getPatientById(id: number): Promise<SequelizePatient | null> {
    return this.patientRepository.getById(id);
  }

  async createPatient(data: PatientDto): Promise<SequelizePatient> {
    if (!data) throw new Error("No data provided.");

    const newPatient = await this.patientRepository.create(data);
    return newPatient;
  }

  async updatePatient(
    id: number,
    data: Partial<PatientDto>
  ): Promise<SequelizePatient | null> {
    const [updatedRows] = await this.patientRepository.update(id, data);
    if (updatedRows === 0) return null;

    const updatedPatient = await this.patientRepository.getById(id);
    return updatedPatient;
  }

  async deletePatient(id: number): Promise<boolean> {
    const patientScreeningTests =
      await this.screeningTestService.getAllScreeningTestsByPatientId(id);
    await this.screeningTestService.deleteAllPatientScreeningTests(
      patientScreeningTests
    );

    const deletedCount = await this.patientRepository.delete(id);
    return deletedCount > 0;
  }
}

export default PatientService;
