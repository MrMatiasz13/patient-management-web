import { ExaminationDto } from "../dtos/examinationDto";
import SequelizeExamination from "../models/examination";

class ExaminationRepository {
  async findByPatientId(patientId: number) {
    return await SequelizeExamination.findAll({ where: { patientId } });
  }

  async create(data: ExaminationDto) {
    return await SequelizeExamination.create(data);
  }

  async delete(id: number) {
    return await SequelizeExamination.destroy({ where: { id } });
  }
}

export default ExaminationRepository;
