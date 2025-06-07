import { ScreeningTestDto } from "../dtos/ScreeningTestDto";
import SequelizeScreeningTest from "../models/screeningTest";

class ScreeningTestRepository {
  async findByPatientId(patientId: number) {
    return await SequelizeScreeningTest.findAll({ where: { patientId } });
  }

  async create(data: ScreeningTestDto) {
    return await SequelizeScreeningTest.create(data);
  }

  async delete(id: number) {
    return await SequelizeScreeningTest.destroy({ where: { id } });
  }
}

export default ScreeningTestRepository;
