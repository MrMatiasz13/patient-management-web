import { CreationAttributes } from "sequelize";
import SequelizePatient from "../models/patient";

export type PatientDto = CreationAttributes<SequelizePatient>;
