import { CreationAttributes } from "sequelize";
import SequelizeExamination from "../models/examination";

export type ExaminationDto = CreationAttributes<SequelizeExamination>;
