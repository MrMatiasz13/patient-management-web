import { CreationAttributes } from "sequelize";
import SequelizeExamination from "../models/screeningTest";

export type ScreeningTestDto = CreationAttributes<SequelizeExamination>;
