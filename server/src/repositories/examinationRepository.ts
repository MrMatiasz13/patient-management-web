import SequelizeExamination from "../models/examination";

class ExaminationRepository {
  async findByPatientId(patientId: number) {
    return await SequelizeExamination.findAll({ where: { patientId } });
  }
}

export default ExaminationRepository;
