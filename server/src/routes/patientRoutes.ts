import { Router } from "express";
import { createPatient, getAllPatients, getPatient } from "../controllers/patientController";
import verifyToken from "../middleware/auth";

const patientRouter = Router();

patientRouter.route("/api/patients/create").post(verifyToken, createPatient);
patientRouter.route("/api/patients").get(verifyToken, getAllPatients);
patientRouter.route("/api/patient/:id").get(verifyToken, getPatient);

export default patientRouter;