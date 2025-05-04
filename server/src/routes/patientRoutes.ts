import { Router } from "express";
import { createPatient, deletePatient, getAllPatients, getPatient } from "../controllers/patientController";
import verifyToken from "../middleware/auth";

const patientRouter = Router();

patientRouter.route("/api/patients/create").post(verifyToken, createPatient);
patientRouter.route("/api/patients").get(verifyToken, getAllPatients);
patientRouter.route("/api/patient/:id").get(verifyToken, getPatient);
patientRouter.route("/api/patient/:id").post(verifyToken, deletePatient);

export default patientRouter;