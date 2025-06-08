import { PatientDto } from "../dtos/patientDto";
import SequelizePatient from "../models/patient";

class PatientRepository {
  async findAll(): Promise<SequelizePatient[]> {
    return SequelizePatient.findAll();
  }

  async getById(id: number): Promise<SequelizePatient | null> {
    return SequelizePatient.findOne({ where: { id } });
  }

  async create(data: PatientDto) {
    return SequelizePatient.create(data);
  }

  async update(
    id: number,
    data: Partial<PatientDto>
  ): Promise<[number, SequelizePatient[]]> {
    return SequelizePatient.update(data, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    return SequelizePatient.destroy({
      where: { id },
    });
  }
}

export default PatientRepository;
