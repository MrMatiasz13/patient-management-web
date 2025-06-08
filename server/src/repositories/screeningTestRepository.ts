import { ScreeningTestDto } from "../dtos/screeningTestDto";
import SequelizeScreeningTest from "../models/screeningTest";

class ScreeningTestRepository {
  async findAllByPatientId(patientId: number) {
    return SequelizeScreeningTest.findAll({ where: { patientId } });
  }

  async getById(id: number) {
    return SequelizeScreeningTest.findOne({ where: { id } });
  }

  async create(data: ScreeningTestDto) {
    return SequelizeScreeningTest.create(data);
  }

  async delete(id: number) {
    return SequelizeScreeningTest.destroy({ where: { id } });
  }
}

export default ScreeningTestRepository;
