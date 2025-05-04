import PatientDto from "../dtos/patientDto";
import SequelizePatient from "../models/patient";

class PatientService {
    async getAllPatients(): Promise<SequelizePatient[]> {
        return await SequelizePatient.findAll();
    }

    async getPatientById(id: number): Promise<SequelizePatient | null> {
        return await SequelizePatient.findOne({ where: { id: id} });
    }

    async createPatient(data: PatientDto): Promise<SequelizePatient> {
        return await SequelizePatient.create(data);
    }

    async updatePatient(id: number, data: Partial<PatientDto>): Promise<SequelizePatient | null> {
        const [updatedRows] = await SequelizePatient.update(data, { where: { id } });
        if (updatedRows === 0) return null;
        return await SequelizePatient.findOne({ where: { id } });
    }

    async deletePatient(id: number) {
        return await SequelizePatient.destroy({ where: { id } });
    }
}



export default PatientService;