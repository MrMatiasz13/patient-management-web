import { Router } from "express";
import createPatient from "../controllers/patientController";

const patientRouter = Router();

patientRouter.route("/api/patients/create").post(createPatient);

export default patientRouter;